import React from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import ReactSwiper from "../components/ReactSwiper";
import ProductCategories from "../components/ProductCategories";
import RectangleCard from "../components/RectangleCard";
import Api from "../utils/Api";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { list: [] };
  }

  componentDidMount() {
    axios.get(Api(`/games`)).then(
      (response) => {
        this.setState({ list: response.data.data });
        console.log(response.data.data);
      },
      (error) => {
        console.log("fail", error);
      }
    );
  }

  render() {
    return (
      <Container maxWidth="md" component="main" sx={{ mt: 10 }}>
        <ProductCategories />
        <div>
          <ReactSwiper>
            {this.state.list.map((item) => (
              <div className="swiper-slide" key={item.id}>
                {/* <img
                  src="https://pic4.zhimg.com/v2-de9718adb9a6d0d7c3e3c4c5301e1993_r.jpg"  
                  alt="https://pic4.zhimg.com/v2-de9718adb9a6d0d7c3e3c4c5301e1993_r.jpg"
                  style={{ width: "100%" }}
                /> */}
                <RectangleCard gamesObj={item} />
              </div>
            ))}
          </ReactSwiper>
        </div>
      </Container>
    );
  }
}
