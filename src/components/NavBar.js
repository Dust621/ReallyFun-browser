import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  InputBase,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ForumIcon from "@mui/icons-material/Forum";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Api from "../utils/Api";
import History from "./History";

// 导航栏左上方显示的标签
const pages = [
  { label: "首页", to: "/" },
  { label: "游戏分类", to: "/classify/0" },
  { label: "热门推荐", to: "/recommend" },
  { label: "最新上线", to: "/latest" },
];
// 点击个人头像后显示的菜单
const settings = [
  { label: "个人空间", to: "/profile" },
  { label: "管理面板", to: "/admin" },
  { label: "我的收藏", to: "/collection" },
  { label: "游玩历史", to: "/history" },
  { label: "上传游戏", to: "/upload" },
];
// 定义搜索条的风格
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorElNav: null,
      anchorElUser: null,
      searchGame: null,
      searchResult: [],
    };
  }

  searchRequest() {
    this.props.onSearch(this.state.searchGame);
  }

  // 监测Enter键是否被按下
  inputKeyUp = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      History.replace({ pathname: `/searchPage/${e.target.value}`, state: {} });
      History.go(0);
      this.setState({ searchGame: e.target.value });
      this.searchRequest();
      console.log(this.state);
      axios
        .get(Api(`/games`), {
          params: {},
        })
        .then(
          (response) => {
            this.setState({ searchResult: response.data });
            console.log(response.data);
          },
          (error) => {
            console.log("fail", error);
          }
        );
    }
  };

  setAnchorElNav(value) {
    this.setState({ anchorElNav: value });
  }

  setAnchorElUser(value) {
    this.setState({ anchorElUser: value });
  }

  // 处理登出事件
  async handleLogout() {
    console.log("handleLogout");
    this.props.onLogout();
    History.replace({ pathname: "/login", state: {} });
    History.go(0);
  }

  // 处理打开导航栏目录事件
  handleOpenNavMenu(event) {
    console.log("handleOpenNavMenu");
    this.setAnchorElNav(event.currentTarget);
  }

  // 处理打开用户菜单事件
  handleOpenUserMenu(event) {
    console.log("handleOpenUserMenu");
    this.setAnchorElUser(event.currentTarget);
  }

  // 处理关闭导航栏目录事件
  handleCloseNavMenu() {
    console.log("handleCloseNavMenu");
    this.setAnchorElNav(null);
  }

  // 处理关闭用户菜单事件
  handleCloseUserMenu() {
    console.log("handleCloseUserMenu");
    this.setAnchorElUser(null);
  }

  // 渲染中等屏幕下的展示效果
  renderMD() {
    return (
      <>
        {/* MD LOGO */}
        <ForumIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
        {/* MD REALLYFUN */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          游点好玩
        </Typography>
        {/* MD ITEMS */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "none", md: "flex" },
          }}
        >
          {/* 若当前用户未登录，也可以浏览各游戏界面 */}
          {/* {this.props.uid !== null && */}
          {pages.map(({ label, to }) => (
            <Button
              key={label}
              onClick={(ev) => this.handleCloseNavMenu(ev)}
              align="center"
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
              component={Link}
              to={to}
            >
              {label}
            </Button>
          ))}
        </Box>
      </>
    );
  }

  // 较小页面展示效果
  renderXS() {
    return (
      <>
        {/* XS MENU ICON */}
        <Box
          sx={{
            flexGrow: 1,
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(ev) => this.handleOpenNavMenu(ev)}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          {this.props.uid !== null && (
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(this.state.anchorElNav)}
              onClose={(ev) => this.handleCloseNavMenu(ev)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map(({ label, to }) => (
                <MenuItem
                  key={label}
                  onClick={(ev) => this.handleCloseNavMenu(ev)}
                  component={Link}
                  to={to}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          )}
        </Box>
        {/* XS LOGO */}
        <ForumIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
        {/* XS REALLYFUN */}
        <Typography
          variant="h5"
          noWrap
          component="a"
          // href="/"
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            // fontFamily: "monospace",
            fontWeight: 700,
            // letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          游点好玩
        </Typography>
      </>
    );
  }

  // 渲染头像及菜单
  renderAvatar() {
    return (
      <>
        {/* MD & XS AVATAR */}
        {this.props.uid !== null ? (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={(ev) => this.handleOpenUserMenu(ev)} sx={{ p: 0 }}>
                <Avatar>{this.props.uid}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={this.state.anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(this.state.anchorElUser)}
              onClose={(ev) => this.handleCloseUserMenu(ev)}
            >
              {settings.map(({ label, to }) => (
                <MenuItem
                  key={label}
                  onClick={(ev) => this.handleCloseUserMenu(ev)}
                  component={Link}
                  to={to}
                >
                  <Typography textAlign="center">{label}</Typography>
                </MenuItem>
              ))}
              <MenuItem
                key="logout"
                onClick={(ev) => {
                  this.handleCloseUserMenu(ev);
                  this.handleLogout();
                }}
              >
                <Typography textAlign="center">注销</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button
            key="Login"
            onClick={(ev) => this.handleCloseNavMenu(ev)}
            sx={{
              my: 2,
              color: "white",
              display: "block",
            }}
            component={Link}
            to="/login"
            // to="/signin"
          >
            登录
          </Button>
        )}
      </>
    );
  }

  render() {
    return (
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {this.renderMD()}
            {this.renderXS()}
            {/* 插入搜索条 */}
            <Search onKeyUp={this.inputKeyUp}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="发现更多…" inputProps={{ "aria-label": "search" }} />
            </Search>
            {this.renderAvatar()}
            {this.searchRequest()}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
export default NavBar;
