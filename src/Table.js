import React from 'react';
import './App.css'
import { Table, Tag, Typography, Card, Input, Tooltip } from 'antd';
import TableModel from './TabelModel'
import axios from 'axios';

const { Paragraph } = Typography;

class TableList extends React.Component {
  state = {
    tabelDate: [],
    keyword: '',
    seaDate: [],
    visible: false,
  }

  componentDidMount () {
    this.getList();
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  getList = () => {
    axios.get('http://www.mocky.io/v2/5ea28891310000358f1ef182').then(res => {
      console.log(res, 123)
      this.setState({ tabelDate: res.data.apis })
    })
  }

  searchInput = e => {
    const { tabelDate } = this.state;
    this.setState({ keyword: e.target.value })
    if(!e.target.value) {
      this.setState({ tabelDate })
    } else {
      const searchDate = tabelDate.map(list => {
        if(list.tags.length) {
          if (!list.tags.indexOf(e.target.value)) {
            return list
          }
        }
      }).filter(item => item !== undefined)
      this.setState({ seaDate: searchDate })
    }
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: '300px',
        render: text => {
          return (
            <Tooltip title={text}>
							<Paragraph style={{ width: '300px' }} ellipsis={{ rows: 1, expandable: false }}>
								{text}
							</Paragraph>
						</Tooltip>
          )
        }
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render: text => {
          return <img src={text} />
        }
      },
      {
        title: 'BaseUrl',
        dataIndex: 'baseURL',
        key: 'baseURL',
        render: text => {
					console.log(text, 222)
          return <a href={text}>链接</a>
        }
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
          <>
            {tags.map(tag => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === 'loser') {
                color = 'volcano';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'properties',
        dataIndex: 'properties',
        render: (text, record) => (
          <a onClick={this.showModal}>Modal</a>
        ),
      },
    ];

    const { tabelDate, seaDate, keyword, visible } = this.state;
    return (
      <Card
        title={
          <Input style={{ width: '200px' }} placeholder="请输入tags进行精确搜索" onChange={this.searchInput} />
        }
      >
        <Table
          loading={!this.state.tabelDate.length}
          columns={columns}
          dataSource={keyword ? seaDate : tabelDate}
        />
        <TableModel
					visible={visible}
					handleCancel={this.handleCancel}
					handleOk={this.handleOk}
        />
      </Card>
    )
  }
}

export default TableList;
