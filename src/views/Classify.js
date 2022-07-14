import React from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Api from "../utils/Api";
import { withParams, withNavigate } from "../utils/RouterTool";
import ClippedDrawer from "../components/Drawer";
import SquareCard from "../components/SquareCard";

// 游戏分类界面，由侧边栏、正方形游戏卡片组成
class Classify extends React.Component {
  constructor(props) {
    super(props);
    this.state = { games: [] };
  }

  // componentDidMount() {
  //   if (this.props.params.classTag !== 0) {
  //     axios
  //       .get(Api(`/games`), {
  //         params: { tag_id: this.props.params.classTag },
  //       })
  //       .then(
  //         (response) => {
  //           this.setState({ games: response.data.data });
  //         },
  //         (error) => {
  //           console.log("fail", error);
  //         }
  //       );
  //   }
  // }

  handleSaveGames(value) {
    this.setState({ games: value });
  }

  render() {
    return (
      <>
        <ClippedDrawer onSaveGames={(value) => this.handleSaveGames(value)} />
        <Container maxWidth="md" component="main">
          <Grid container sx={{ mt: 10 }} spacing={2}>
            {this.state.games.map((gamesObj) => (
              // <RectangleCard gamesObj={gamesObj} />
              <SquareCard gamesObj={gamesObj} />
            ))}
          </Grid>
        </Container>
      </>
    );
  }
}

export default withParams(Classify);
