from flask import render_template, jsonify
from app import app
import pandas as pd

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/get_data/<int:posto>/<int:ano>/<int:mes>')
def get_data(posto, ano, mes):
    filename = f'data/{posto}.csv'
    df = pd.read_csv(filename)
    
    
    df_filtered = df[(df['ANO'] == ano) & (df['MES'] == mes)]
    
   
    df_monthly_accumulated = df_filtered.groupby('DIA')['CHUVA'].sum().cumsum()
    
   
    df_annual_accumulated = df.groupby(['ANO', 'MES'])['CHUVA'].sum().groupby(level=0).cumsum()
    
    return jsonify({
        'daily_rain_series': df_monthly_accumulated.to_dict(),
        'monthly_accumulated': df_monthly_accumulated.sum(),
        'annual_accumulated': df_annual_accumulated.loc[ano].sum()
    })