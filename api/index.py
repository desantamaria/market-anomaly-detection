from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf


app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def createMA(df, window, ticker):
    df[f'{ticker}_MA'] = df[ticker].rolling(window=window).mean()
    return df

@app.get("/api/py/getMarketData")
async def get_market_data():
    try:
        ticker_list = ['VIX', 'DXY', 'JPY', 'GBP', 'MXEU', 'MXCN']
        yf_tickers = ['^VIX', 'DX-Y.NYB', 'JPY=X', 'GBPUSD=X', 'MXEU.L', 'MXCN.SW']
        
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
            ticker: [{'date': str(date), 'price': float(price), 'MA': float(ma)} 
                    for date, price, ma in zip(df['Date'], df[ticker], df[f'{ticker}_MA'])]
            for ticker in ticker_list
        }
        
        dates = {
            'dates': [str(date) for date in df['Date']]
        }
        
        return {**json_data, **dates}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))