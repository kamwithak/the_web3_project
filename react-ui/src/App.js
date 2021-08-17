import React from 'react';
import axios from 'axios';
import Web3 from 'web3';
import logo from './logo.svg';
import styled from 'styled-components';

import TablePage from './components/TablePage';
import HomePage from './components/HomePage';
import VideoPage from './components/VideoPage';

import { Navbar, Nav, Icon, Dropdown } from 'rsuite';
import { Switch, Route } from 'react-router-dom';

class App extends React.Component {

  async componentWillMount() {
    this.loadWeb3()
  }
  async componentDidMount() {
    await axios.get("/coding-challenge/api/getTableData")
      .then(resp => {
        this.setState({
          tableData: resp.data,
          fetchedAccountsData: true
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

   async loadWeb3() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0){
          this.setState({
            currentAddress: accounts[0],
            authenticated: true
          })
        } else {
          this.setState({
            currentAddress: null,
            authenticated: false
          })
        }
      })

      window.web3 = new Web3(window.ethereum)
      const accounts = await window.web3.eth.getAccounts()
      if (accounts.length !== 0) {
        this.setState({
          currentAddress: accounts[0],
          authenticated: true
        })
      }    
    }  
  }

  async connectWallet() {
    await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    .then(() => {
      this.loadWeb3()
    })
  }

  constructor(props) {
		super(props);
    this.state = {
      tableData: [],
      currentAddress: null,
      authenticated: false,
      fetchedAccountsData: false
    } 
  }
  
  render() {
    const {
      tableData,
      fetchedAccountsData,
      authenticated
    } = this.state

    return (
      <div className="App">
        <Navbar appearance={'subtle'}>
          <Navbar.Header>
              <a href='/'>
                  <Logo>
                      <img src={logo} alt="Ledn" />
                  </Logo>
              </a>
          </Navbar.Header>
          <Navbar.Body>
              <Nav>
                  <ItemsWrapper>
                      <Nav.Item href="/" icon={<Icon icon="home" />}>Start Here</Nav.Item>
                      <Nav.Item href="/table" >Table</Nav.Item>
                      <Nav.Item href="/video" >Videos</Nav.Item>
                      <Dropdown title="Contact Developer">
                          <Dropdown.Item onClick={() => window.open("https://kamwithak.github.io/")}>Personal Website</Dropdown.Item>
                          <Dropdown.Item onClick={() => window.open("https://github.com/kamwithak/")}>GitHub</Dropdown.Item>
                          <Dropdown.Item onClick={() => window.open("https://www.linkedin.com/in/kamranwithak")}>LinkedIn</Dropdown.Item>
                      </Dropdown>
                  </ItemsWrapper>
              </Nav>
              <Nav pullRight>
              { authenticated
                  ? <Nav.Item icon={<Icon icon="" />}><span role='img' aria-labelledby='...'>🌿</span>  &nbsp;Wallet Connected</Nav.Item>
                  : <Nav.Item icon={<Icon icon="codepen" />} onClick={() => {this.connectWallet()                }}> Connect Wallet</Nav.Item>
              }
              </Nav>
          </Navbar.Body>
        </Navbar>
        <Switch>
          <Route exact path={'/'} component={() => <HomePage/>} />
          <Route
            path={'/table'}
            component={
              () => <TablePage
                      tableData={tableData}
                      fetchedAccountsData={fetchedAccountsData} />
            }/>
          <Route
            path={'/video'}
            component={
              () => <VideoPage />
            }/>
        </Switch>
      </div>
    );
  }
}

export default App;

const Logo = styled.div`
    width: 60px;
    height: 50px;
    margin-left: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ItemsWrapper = styled.div`
    margin-left: 28px;
`