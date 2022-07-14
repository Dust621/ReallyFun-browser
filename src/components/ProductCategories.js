import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import Typography from "./Typography";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.46f8482085d0d401f78052355c5e6a80?rik=X5IPdEdBFomyYQ&riu=http%3a%2f%2fpic2.52pk.com%2ffiles%2f120427%2f801441_114702_9142.jpg&ehk=gQ9MNC7XBz6XifggCgPPyqfqqIYSwxkQAGzgU0ynK2I%3d&risl=&pid=ImgRaw&r=0",
    title: "休闲游戏",
    width: "40%",
    tag_id: "5",
  },
  {
    url: "https://tse2-mm.cn.bing.net/th/id/OIP-C.nglWTvu-VLFcpXmolmEftwHaJ4?w=204&h=272&c=7&r=0&o=5&pid=1.7",
    title: "益智游戏",
    width: "20%",
    tag_id: "1",
  },
  {
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.7143b8b978d3d6e0b5ba89e0bc258fab?rik=MVWyGRITfg1Sqg&riu=http%3a%2f%2fimg1.yo4399.com%2fimg%2f3b%2fa7e803a037c8e45d5c84.jpg&ehk=f6KU51XDTCWS9Bi6fwVUm1zbdcrjgGKQW3cpl9XyXQM%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
    title: "射击游戏",
    width: "40%",
    tag_id: "3",
  },
  {
    url: "https://image.gcores.com/91bb57e4-4ea8-45b1-bf29-984ff2052f13.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_1600/quality,q_90",
    title: "动作游戏",
    width: "38%",
    tag_id: "2",
  },
  {
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.7676bd5af2dd4607baed56d4e617b615?rik=3dkIXE8uNabLRA&riu=http%3a%2f%2fa2.mzstatic.com%2fus%2fr30%2fPurple2%2fv4%2f7e%2f91%2f62%2f7e916275-0b1a-a9b8-7b77-b24e55bfd7f8%2fmzl.rgsbzcct.jpg&ehk=fu8hcmackhYZGXfE4PfNo8Y8S%2ff4ioMg45M76cH5C2g%3d&risl=&pid=ImgRaw&r=0",
    title: "棋牌游戏",
    width: "38%",
    tag_id: "6",
  },
  {
    url: "https://pic4.zhimg.com/v2-de9718adb9a6d0d7c3e3c4c5301e1993_r.jpg",
    title: "消除游戏",
    width: "24%",
    tag_id: "4",
  },
];

export default function ProductCategories() {
  return (
    <Container component="section" sx={{ mt: 8, mb: 4 }}>
      <Typography variant="h4" marked="center" align="center" component="h2">
        消遣一刻，好游推荐
      </Typography>
      <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
        {images.map((image) => (
          <ImageIconButton
            key={image.title}
            href={`/classify/${image.tag_id}`}
            style={{
              width: image.width,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 40%",
                backgroundImage: `url(${image.url})`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography component="h3" variant="h6" color="inherit" className="imageTitle">
                {image.title}
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        ))}
      </Box>
    </Container>
  );
}
