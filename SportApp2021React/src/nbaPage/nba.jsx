import GameCard from "../components/gameCard/GameCard";
import "./nba.scss";
import nbaHelper from "./nbaHelper";
import React from "react";
import { Card, Container, Row,Col } from "react-bootstrap";

class NBAPage extends React.Component {
  // Used to generate jsx gamecard
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }
  genGameCard() {
    let output = [];
    nbaHelper
      .getLatestResult()
      .then((result) => {
        let i = 0;

        for (let date in result) {
          let temp = [];

          for (let x in result[date]) {
            const game = result[date][x];
            temp.push(<Col  key={i} className="GameCard" style={{paddingLeft:"0px", paddingRight:"0px"}}>
              <GameCard
               
                team1={game[0]}
                team2={game[1]}
                team1Score={game[2]}
                team2Score={game[3]}
                className="GameCard"
              >
                {game[0]}
              </GameCard></Col>
            );
            i += 1;
          }
          let dayCard = (
            <Card>
              <Card.Header style={{color:"black",textAlign:"cneter"}}>{date}</Card.Header>
              <Container fluid className="justify-content-lg-left" style={{justifyContent:"left",display:"flex",marginLeft:"0",marginRight:"0"}} >
                <Row xs="1" sm="2" md="4" className="justify-content-lg-left">{temp}</Row>
              </Container>
            </Card>
          );
          output.push(dayCard);
          
        }

        this.setState({ games: output });
      })
      .catch((err) => {
        alert(err);
      });
  }
  componentDidMount() {
    
    this.genGameCard();
  }

  render() {
  
    return <div className="gamesList">{this.state.games}</div>;
  }
}
export default NBAPage;
