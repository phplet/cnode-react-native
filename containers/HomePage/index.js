import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ListView
} from 'react-native';
import TabLayout, {
  Tabs,
  Bars
} from '../../components/TabLayout';
import ViewPager from '../../components/ViewPager';
import TabItem from '../../components/TabItem';
import List from '../../components/List';
import {
  getTopicList
} from '../../actions';
import Store from '../../store';
import JobPage from '../JobPage';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentContainerStyle:null,
      tabStyle:null,
    }
  }

  get window() {
    return Dimensions.get('window');
  }
  componentDidMount() {
    this.setState({
      contentContainerStyle:{
        width: this.window.width * 3,
        flex:1,
        flexDirection:'row',
        backgroundColor:'#CCCCCC'
      },
      tabStyle:{
        width:this.window.width,
        flex:1,
      },
    });
  }
  _onTabClick(index) {
    let width = this.window.width;
    this.refs.ScrollView.scrollTo({
      x:index * width,
      y:0,
      animated:false
    });
  }
  render() {
    let { 
      contentContainerStyle,
      tabStyle
    } = this.state;
    let scrollViewProps = {
      horizontal:true,
      scrollEnabled:false,
      style:[styles.scrollView],
      contentContainerStyle,
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false
    };
    
    return (
      <TabLayout>
        <Bars type="Bars">
          <TabItem key={1} icon="home" txt="首页"/>
          <TabItem key={2} icon="graduation-cap" txt="招聘"/>
          <TabItem key={3} icon="heart" txt="收藏"/>
          <TabItem key={4} icon="github" txt="我"/>
        </Bars>
        <Tabs type="Tabs">
            <ViewPager store={Store}/>
            <JobPage />
            <Text>Tab Content3</Text>
            <Text>Tab Content4</Text>
        </Tabs>
      </TabLayout>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabs: {
    height:50,
    flex:1,
    flexDirection:'row',
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderTopWidth:1,
    borderTopColor:'#CCCCCC',
    backgroundColor:'#FFFFFF'
  },
  tabItem: {
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  scrollView: {

  },
  contentContainerStyle: {

  }
});