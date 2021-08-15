import React from 'react';
import axios from 'axios';
import download from 'downloadjs';

import LoadingTable from './LoadingTable';

import {
    Content,
    Input,
    InputGroup,
    Icon,
    SelectPicker,
    FlexboxGrid,
    Button,
    ButtonGroup,
    ButtonToolbar,
    Tooltip,
    Whisper
} from 'rsuite';

class TablePage extends React.Component {
    
    constructor(props) {
		super(props);
        this.state = {
            tableData: props.tableData,
            fetchedAccountsData: props.fetchedAccountsData,
            filteredMoreThanOnce: false,
            countryCodes: [],
            MFAOptions: []
        } 
    }

    async componentDidMount() {
        await axios.get("/coding-challenge/api/getMFAOptions")
        .then(resp => {
            this.setState({MFAOptions: resp.data})
        })
        .catch(err => {
            console.log(err)
        })

        await axios.get("/coding-challenge/api/getCountryCodes")
        .then(resp => {
            this.setState({countryCodes: resp.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentWillUnmount() {
        this.setState = (state,callback)=>{
            return null;
        };
    }

    async requestCSVFromServer() {
        const res = await fetch("/coding-challenge/api/getCSVFile");
        const blob = await res.blob();
        download(blob, "Ledn_Token_Data.csv");
    }

    searchByFirstName(rawInputFirstName) {
        if (!rawInputFirstName) {
            window.location.reload();
        }
        const inputFirstName = rawInputFirstName.toLowerCase();
        if (this.state.filteredMoreThanOnce) {
            const tableData = this.state.tableData.filter(
                (account) => account['First Name'].toLowerCase().indexOf(inputFirstName) > -1
            )
            this.setState({tableData})
        } else {
            const tableData = this.props.tableData.filter(
                (account) => account['First Name'].toLowerCase().indexOf(inputFirstName) > -1
            )
            this.setState({tableData, filteredMoreThanOnce: true})
        }
    }
    
    searchByLastName(rawInputLastName) {
        if (!rawInputLastName) {
            window.location.reload();
        }
        const inputLastName = rawInputLastName.toLowerCase();
        if (this.state.filteredMoreThanOnce) {
            const tableData = this.state.tableData.filter(
                (account) => account['Last Name'].toLowerCase().indexOf(inputLastName) > -1
            )
            this.setState({tableData})
        } else {
            const tableData = this.props.tableData.filter(
                (account) => account['Last Name'].toLowerCase().indexOf(inputLastName) > -1
            )
            this.setState({tableData, filteredMoreThanOnce: true})
        }
    }

    filterByCountryCode(rawInputCountryCode) {
        const inputCountryCode = rawInputCountryCode.toLowerCase();
        if (this.state.filteredMoreThanOnce) {
            const tableData = this.state.tableData.filter(
                (account) => account['Country'].toLowerCase().includes(inputCountryCode) 
            )
            this.setState({tableData})
        } else {
            const tableData = this.props.tableData.filter(
                (account) => account['Country'].toLowerCase().includes(inputCountryCode) 
            )
            this.setState({tableData, filteredMoreThanOnce: true})
        }
    }

    filterByMFAType(rawInputMFAType) {
        const inputMFAType = rawInputMFAType.toLowerCase();
        if (this.state.filteredMoreThanOnce) {
            const tableData = this.state.tableData.filter(
                (account) => account['mfa'].toLowerCase().includes(inputMFAType) 
            )
            this.setState({tableData})
        } else {
            const tableData = this.props.tableData.filter(
                (account) => account['mfa'].toLowerCase().includes(inputMFAType) 
            )
            this.setState({tableData, filteredMoreThanOnce: true})
        }
    }

    render() {
        const {
            tableData,
            fetchedAccountsData,
            countryCodes,
            MFAOptions
        } = this.state

        return (
            <Content>
                <FlexboxGrid
                    justify='space-between'
                    style={{ background: '#151212', padding: 6 }}>
                    <FlexboxGrid.Item colspan={2.5}>
                        <InputGroup inside>
                            <Input
                                placeholder="Search by First Name"
                                onChange={(rawInputFirstName) => this.searchByFirstName(rawInputFirstName)}/>
                            <InputGroup.Addon>
                                <Icon icon="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={2.5}>
                        <InputGroup inside>
                            <Input
                                placeholder="Search by Last Name"
                                onChange={(rawInputLastName) => this.searchByLastName(rawInputLastName)}/>
                            <InputGroup.Addon>
                                <Icon icon="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <InputGroup inside>
                            <SelectPicker
                                data={countryCodes}
                                onSelect={(rawCountryCode) => this.filterByCountryCode(rawCountryCode)}
                                appearance="default"
                                placeholder="Filter by Country Code"
                                onClean={
                                    () => window.location.reload()
                                }
                            />
                        </InputGroup>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item>
                        <InputGroup inside>
                            <SelectPicker
                                data={MFAOptions}
                                onSelect={(rawMFAType) => this.filterByMFAType(rawMFAType)}
                                appearance="default"
                                placeholder="Filter by MFA Type"
                                onClean={
                                    () => window.location.reload()
                                }
                            />
                        </InputGroup>
                    </FlexboxGrid.Item>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Whisper
                                placement="left"
                                trigger="hover"
                                speaker={
                                    <Tooltip>
                                        Removes Filters
                                    </Tooltip>
                                }>
                                <Button appearance="ghost" onClick={() => window.location.reload()}>
                                    Refresh Table
                                </Button>
                            </Whisper>
                        </ButtonGroup>
                    </ButtonToolbar>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Whisper
                                placement="left"
                                trigger="hover"
                                speaker={
                                    <Tooltip>
                                        CSV File
                                    </Tooltip>
                                }>
                                <Button appearance="ghost" onClick={() => this.requestCSVFromServer()}>
                                    Download Data
                                </Button>
                            </Whisper>
                        </ButtonGroup>
                    </ButtonToolbar>
                </FlexboxGrid>

                <LoadingTable
                    tableData={tableData}
                    fetchedAccountsData={fetchedAccountsData}
                />
            </Content>
        )
    }
}

export default TablePage;