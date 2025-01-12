from fastapi import FastAPI
import yfinance as yf
import json

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

def createMA(df, window, ticker):
    df[f'{ticker}_MA'] = df[ticker].rolling(window=window).mean()

    return df

@app.get("/api/py/getMarketData")
def get_market_data():
    ticker_list = ['VIX', 'DXY', 'JPY', 'GBP', 'MXEU', 'MXCN']
    yf_tickers = ['^VIX', 'DX-Y.NYB', 'JPY=X', 'GBPUSD=X', 'MXEU.L', 'MXCN.SW']

    tickers = yf.Tickers('^VIX DX-Y.NYB JPY=X GBPUSD=X MXEU.L MXCN.SW')
    tickers.tickers['^VIX'].info
    df = yf.download(yf_tickers, period='6mo')
    
    column_mapping = dict(zip(yf_tickers, ticker_list))
    df = df.rename(columns=column_mapping)
    
    df = df[['Close']].droplevel(level=0, axis=1)
    
    df = df.dropna()
    for ticker in ticker_list:
        df = createMA(df, 12, ticker)
    df = df.dropna()
    
    df = df.reset_index()
    
    json_data = {
        ticker: [{'date': date, 'price': price, 'MA': ma} for date, price, ma in zip(df['Date'], df[ticker], df[f'{ticker}_MA'])]
        for ticker in ticker_list
    }
        
    return json_data

@app.post("/api/py/getPrediction")
def get_prediction(financial_data):
    print(financial_data)
    return {"PREDICTION"}