import React, {
  Component
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import autobind from 'autobind-decorator'

export class Bars extends Component {
  constructor(props) {
    super(props);
    this.TYPE = "Bars";
    this.bars = null;
    this.tabs = null;
  }

  render() {
    return (
      <View>{this.props.children}</View>
    );
  }
}

export class Tabs extends Component {
  constructor(props) {
    super(props);
    this.TYPE = 'Tabs';
  }

  render() {
    return (
      <View>{this.props.children}</View>
    );
  }
}

export default class TabLayout extends Component {
  constructor(props) {
    super(props);
  }

  get window() {
    return Dimensions.get('window');
  }

  @autobind
  onTabBarClick(index) {
    let width = this.window.width;
    this.refs.scrollView.scrollTo({
      x:index * width,
      y:0,
      animated:false
    });
    let barsCount = React.Children.count(this.bars);
    for(let i=0;i<barsCount;i++) {
      if(index === i) {
        this.refs[`bar${i}`].changeActiveStatus(true);
      }else {
        this.refs[`bar${i}`].changeActiveStatus(false);
      }
    }
    this.refs[`tab${index}`] && this.refs[`tab${index}`].init && this.refs[`tab${index}`].init();
  }

  @autobind
  renderTabs(tabs) {
    let children = [];
    let tabsCount = React.Children.count(tabs);
    let contentContainerStyle = {
      width: this.window.width * tabsCount,
      flex:1,
      flexDirection:'row',
      backgroundColor:'#FFFFFF'
    };
    let scrollViewProps = {
      horizontal:true,
      scrollEnabled:false,
      contentContainerStyle,
      showsHorizontalScrollIndicator:false,
      showsVerticalScrollIndicator:false
    };
    let tabStyle = {
      width:this.window.width,
      flex:1,
    };
    React.Children.forEach(tabs,(tab,index) => {
      let tabItem = (
        <View style={tabStyle} key={index}>
          {React.cloneElement(tab,{ref: `tab${index}`})}
        </View>
      );
      children.push(tabItem);
    });
    return (
      <ScrollView ref="scrollView" {...scrollViewProps}>
        {children}
      </ScrollView>
    );
  }

  @autobind
  renderBars(bars) {
    let children = [];
    React.Children.forEach(bars,(bar,index) => {
      let barElement = (
        <TouchableOpacity style={styles.barItem} key={index} onPress={this.onTabBarClick.bind(this,index)}>
          {React.cloneElement(bar,{ref: `bar${index}`})}
        </TouchableOpacity>
      );
      children.push(barElement);
    });
    return (
      <View style={[styles.bars]}>
        {children}
      </View>
    );
  }

  componentDidMount() {
    this.refs.bar0.changeActiveStatus(true);
  }

  render() {
     const {
      children
    } = this.props;
    const childrenCount = React.Children.count(children);
    if(childrenCount !== 2) {
      throw new Error('TabLayout should contain only two children: Bars and Tabs.');
    }
    React.Children.forEach(children,(child,index) => {
      if(child.props.type === 'Bars') {
        this.bars = child.props.children;
      }else if(child.props.type === 'Tabs') {
        this.tabs = child.props.children;
      }
    });
    const barsCount = React.Children.count(this.bars);
    const tabsCount = React.Children.count(this.tabs);
    if(barsCount !== tabsCount) {
      throw new Error('Bars and Tabs must have the same number of children.');
    }
    return (
      <View style={[styles.container]}>
        {this.renderTabs(this.tabs)}
        {this.renderBars(this.bars)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#FFFFFF'
  },
  bars: {
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
  barItem: {
    flex:1,
  },
  tabs: {

  },
  tabItem: {
    flex:1,
  }
});