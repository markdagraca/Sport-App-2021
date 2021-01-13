from flask import Flask
from flask_cors import CORS
import json



def getUrl(url,filename):
    import requests
    import urllib3
 
    r = requests.get(url, allow_redirects=True)
    open(filename, 'wb').write(r.content)
   

def readCSVfile(filename):
    import csv
    with open(filename,'r') as file:
        csv_reader=csv.reader(file)
        output=[]
        for line in csv_reader:
            output.append(line)
        return output

def getTodayDate():
    import datetime
    now = datetime.datetime.now()
    return now.strftime("%Y-%m-%d")


def processMLB(mlb):
    def splitUpComingMLB(mlb):
        upcoming={'info':[],'games':[]}
        past={'data':[],'result':[]}
        dataCol=[6,7,8,9,12,13,20,21]
        infoCol=[0,1,4,5]
        result=[24,25]
        for x in mlb[1:]:
            if(int(x[1])>=2018  ):    
                if len(x[24])>0 and (x[0]!=getTodayDate()) :
                    past['data'].append( [float(x[i]) for i in dataCol]  )
                    past['result'].append( [int(x[i]) for i in result] )
                 

                else:
                    upcoming['info'].append(  [x[i] for i in infoCol] )
                    upcoming['games'].append(  [float(x[i]) for i in dataCol] )

        return [past,upcoming]
    
    # from sklearn.tree import DecisionTreeRegressor as ml
    from sklearn.linear_model import Lasso as ml
    # from sklearn.neural_network    import MLPRegressor as ml
    # from sklearn.neighbors import KNeighborsRegressor   as ml
    from sklearn.kernel_ridge import KernelRidge as mln
    #pastgames
    #upcominggames
    #upcominggamesteam
    
    games=splitUpComingMLB(mlb)
    ml=ml()
    ml=ml.fit(games[0]["data"],games[0]["result"])
    games[1]['result']=ml.predict(games[1]['games'])
    # games[1]['probability']=ml.predict_proba(games[1]['games'])
    def jsonMLB(mlb):
        output={}

        for x in range(0,len(mlb['info'])):
            date=mlb['info'][x][0]
            if not( date in output ):
                output[date]=[]
            info=mlb['info'][x]
            
            temp=[info[3],info[2],str(mlb['result'][x][1]),str(mlb['result'][x][0])]
            output[date].append(temp)

        return output

    return jsonMLB(games[1])



def processNBA(nba):
    def splitUpComingNBA(nba):
        upcoming={'info':[],'games':[]}
        past={'data':[],'result':[]}
        dataCol=[6,7,8,9,18,19,20,21]
        infoCol=[0,1,4,5]
        result=[22,23]
        for x in nba[1:]:
            test=x[0]
            if int(x[1])>=2019 :    
                if len(x[23])>0 and (x[0]!=getTodayDate() ) : #and x[0]!="2020-12-31"
                    past['data'].append( [float(x[i]) for i in dataCol]  )
                    past['result'].append( [int(x[i]) for i in result] )

                else:
                    upcoming['info'].append(  [x[i] for i in infoCol] )
                    upcoming['games'].append(  [float(x[i]) for i in dataCol] )

        return [past,upcoming]
    # from sklearn.tree import DecisionTreeRegressor as ml
    from sklearn.neighbors import KNeighborsRegressor  as ml
    # from sklearn.neural_network    import MLPRegressor as ml

    games=splitUpComingNBA(nba)
    ml=ml()
    ml.fit(games[0]["data"],games[0]["result"])
    games[1]['result']=ml.predict(games[1]['games'])

    def jsonNBA(nba):
        output={}

        for x in range(0,len(nba['info'])):
            date=nba['info'][x][0]
            if not( date in output ):
                output[date]=[]
            info=nba['info'][x]
            
            temp=[info[3],info[2],nba['result'][x][1],nba['result'][x][0]]
            output[date].append(temp)

        return output

    return jsonNBA(games[1])









app = Flask(__name__)
CORS(app)

# # getUrl("https://projects.fivethirtyeight.com/mlb-api/mlb_elo.csv","mlb.csv")
mlb=readCSVfile("mlb.csv")
mlb=processMLB(mlb)

# # getUrl("https://projects.fivethirtyeight.com/nba-model/nba_elo.csv","nba.csv")
nba=readCSVfile("nba.csv")
nba=processNBA(nba)


@app.route('/refresh')
def refresh():
    print("refresh called")
    getUrl("https://projects.fivethirtyeight.com/nba-model/nba_elo.csv","nba.csv")
    # getUrl("https://projects.fivethirtyeight.com/mlb-api/mlb_elo.csv","mlb.csv")

    global mlb
    global nba
    mlb=readCSVfile("mlb.csv")
    mlb=processMLB(mlb)
    nba=readCSVfile("nba.csv")
    nba=processNBA(nba)


    return "refreshed"
@app.route('/mlb')
def mlbPage():
    return mlb
@app.route('/nba')
def nbaPage():
    return nba

if __name__ == '__main__':
    app.run(debug='true')
    # app.run(host='0.0.0.0', port=80)