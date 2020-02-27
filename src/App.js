import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Block from './Block'
import Graph from './Graph'
import { TablePagination } from 'react-pagination-table';
import { Button } from 'semantic-ui-react'


const getApiData = (start, end, token) => {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.open( "GET", `https://api.giosg.com/api/reporting/v1/rooms/84e0fefa-5675-11e7-a349-00163efdd8db/chat-stats/daily/?start_date=${start}&end_date=${end}`, false ) 
  xmlHttp.setRequestHeader('Authorization', token)
      
  xmlHttp.send( null )
  if (xmlHttp.status !== 200) {
    alert("Authorization failed");
    return 'error';
  } else {
    return xmlHttp.responseText
    }
}

const App = () => {
  const [graphToShow, setGraphToShow] = useState(true)
  const [startDate, setStartDate] = useState(
    localStorage.getItem('startD') || ''
  )
  const [endDate, setEndDate] = useState(
    localStorage.getItem('endD') || ''
  )
  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )
  const [data, setData] = useState(null)
  const [noData, setNoData] = useState(true)
  
  const handleSearch = () => {
    let request = getApiData(startDate, endDate, token)
    if (request === ('error')) {
      setNoData(true)
    } else {
        setData(JSON.parse(request))
        setNoData(false)
      }


  }
  const handleStartDate = (e, { value }) => {
    setStartDate(value)
  }
  
  const handleEndDate = (e, { value }) => {
    setEndDate(value)
  }
  
  const handleToken = (e, { value }) => {
    setToken(value)
  }
  useEffect(() => {
    localStorage.setItem('startD', startDate)
    localStorage.setItem('endD', endDate)
    localStorage.setItem('token', token)
  }, [startDate, endDate, token]);

  if (noData) {
    return (
      <div>
        <table className="ui table">
          <tbody>
            <tr>
              <Filter
                label="Start date"
                placeholder="Ex. 2017-01-01"
                handleChange={handleStartDate}
                value={startDate}
              />
              <Filter
                label="End date"
                placeholder="Ex. 2017-01-01"
                handleChange={handleEndDate}
                value={endDate}
              />
              <Filter
                label="Token"
                placeholder="Access token"
                handleChange={handleToken}
                value={token}
              />
              <td>
                <label/>
              <Button fluid type="submit" onClick={() => handleSearch()} className="blue">Send</Button>
              </td>            
            </tr>
          </tbody>
        </table >
        </div>
    )
  }
    return (
    <div>
      <table className="ui table">
        <tbody>
          <tr>
            <Filter
              label="Start date"
              placeholder="Ex. 2017-01-01"
              value={startDate}
              handleChange={handleStartDate}
            />
            <Filter
              label="End date"
              value={endDate}
              placeholder="Ex. 2017-01-01"
              handleChange={handleEndDate}
            />
            <Filter
              label="Token"
              value={token}
              placeholder="Access token"
              handleChange={handleToken}
            />
            <td><label/>
            <Button fluid type="submit" onClick={() => handleSearch()} className="blue">Send</Button>
            </td>
          </tr>
        </tbody>
      </table >
      <div className="toggle-container">
        <div className="ui buttons">
          <button type="submit" onClick={() => setGraphToShow(true)} className="ui black button">Show Data</button>
          <button type="submit" onClick={() => setGraphToShow(false)} className="ui black button">GRAPH!</button>
        </div>
      </div>
      {graphToShow ? 
      <table className="ui table">
      <tbody>
        <tr>
          <Block txt="Total conversation count" value={data.total_conversation_count}/>
          <Block txt="Total user message count" value={data.total_user_message_count}/>
          <Block txt="Total visitor message count" value={data.total_visitor_message_count}/>
        </tr>
      </tbody>  
      </table>
      :<p></p>
      }

      <div className="datatable">
      {graphToShow ? 
        <TablePagination className="ui table"
        headers={["conversation_count","missed_chat_count","visitors_with_conversation_count","date"]}
        data={data.by_date}
        columns="conversation_count.missed_chat_count.visitors_with_conversation_count.date"
        perPageItemCount={5}
        totalCount={data.by_date.length}
        partialPageCount={4}
        arrayOption={ [[' ']] }
        /> :  
          <Graph data={data.by_date}/>
        
      }

    </div>
    </div>
    
    
  );
}
export default App
