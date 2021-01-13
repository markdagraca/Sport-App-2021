import { Table, Card, Container, Row, Col } from "react-bootstrap";
import teamlogo from "../../logo.svg";
import teamLookup from "../../helperfunctions/teamLookup";
import styles from "./GameCard.module.scss";
import "./GameCard.module.scss"
function GameCard(props) {
 
  const team1 = teamLookup(props.team1);
  const team2 = teamLookup(props.team2);

  
  return (
    <Card
      className={styles.gameCard}
      style={{
        backgroundColor: "gray",
        marginRight:"0em",
        marginLeft:"0rem",
        marginBottom:"0rem",
        marginTop:"0rme",
        height:"100%"

      }}
    >
      <Container style={{marginTop:"auto",marginBottom:"auto"}}>
        <Row xs="2">
          <Col>
            <img
              src={team1.logoLocation}
              alt={team1.name}
              className={styles.teamLogo}
            />
          </Col>
          <Col>
            <img
              src={team2.logoLocation}
              alt={team2.name}
              className={styles.teamLogo}
            />
          </Col>
        </Row>
        <Row>
          <Col className={styles.teamName}>{team1.name}</Col>
          <Col className={styles.teamName}>{team2.name}</Col>
        </Row>
        <Row>
          <Col className={styles.teamScore}>{props.team1Score}</Col>
          <Col className={styles.teamScore}>{props.team2Score}</Col>
        </Row>
        <Row>
          {Math.abs(props.team1Score-props.team2Score)}
        </Row>
      </Container>
    </Card>
  );
}

export default GameCard;
