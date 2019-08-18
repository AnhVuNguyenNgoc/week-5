import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Linking, Image } from 'react-native';
import moment from 'moment';
import { News } from './component/LoadingComponent';
import { Card, Button, Icon } from 'react-native-elements';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      news: [],
      pageNumber: 1,
      hasApiError: false,
      reachLastPage: false
    }
  }
  //pageNumber ko tăng

  getNews = async () => {

    try {
      let { pageNumber, news } = this.state
      const response = await fetch(
        'https://1newsapi.org/v2/top-headlines?country=us&apiKey=82d1d9382e2c4f418334d8b93c38ee6a&pageSize=20&page=' + pageNumber
      );
      const jsonData = await response.json()

      const hasMoreArticles = jsonData.articles.length > 0
      if (hasMoreArticles) {
        const newArticleList = this.filterForUniqueArticles(news.concat(jsonData.articles))

        this.setState({ news: newArticleList, pageNumber: pageNumber + 1 });
      } else {
        this.setState({ reachLastPage: true });
      
      }
    } catch (error) {
      console.log('error :', error);
      this.setState({ hasApiError: true });
    }
    this.setState({ loading: false });

  }

  componentDidMount() {
    console.log("run did mount")
    this.getNews()
  }

  filterForUniqueArticles = arr => {
    const cleaned = [];
    arr.forEach(itm => {
      let unique = true;
      cleaned.forEach(itm2 => {
        const isEqual = JSON.stringify(itm) === JSON.stringify(itm2);
        if (isEqual) unique = false;
      });
      if (unique) cleaned.push(itm);
    });
    return cleaned;
  };

  renderArticleItem = ({ item }) => {
    return (
      <Card title={item.title} image={{ uri: item.urlToImage }}>
        <View style={styles.row}>
          <Text style={styles.label}>Source</Text>
          <Text style={styles.info}>{item.source.name}</Text>
        </View>
        <Text style={styles}>{item.content}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Published</Text>
          <Text style={styles.info}>
            {moment(item.publishedAt).format('LLL')}
          </Text>
        </View>
        <Button icon={<Icon />} onPress={() => this.onPressLink(item.url)} title="Read more" backgroundColor="#03A9F4" />
      </Card>
    );
  };

  onPressLink = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URL: ${url}`);
      }
    });
  };

  render() {
    console.log("call render")

    let { loading, hasApiError, news, reachLastPage } = this.state
    if (loading) {
      return (
        <View style={styles.container}>
          <View style={styles.container}>
            <ActivityIndicator size="large" loading={loading} />
          </View>
        </View>
      );
    }

    if (hasApiError) {
      return (
        <View style={styles.container}>
          <Button icon={<Icon />} title="Back to Home" backgroundColor="#03A9F4" />
          <Image style={styles.image} source={require('./assets/500_error.png')}></Image>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.label}>Articles Count:</Text>
          <Text style={styles.info}>{news.length}</Text>
        </View>
        <FlatList
          data={news}
          onEndReached={this.getNews}
          onEndReachedThreshold={1}
          renderItem={this.renderArticleItem}
          keyExtractor={item => item.title}
          ListFooterComponent={reachLastPage ? <Text style = {styles.endListInfor}>No more articles</Text> : <ActivityIndicator
            size="large"
            loading={loading}
          />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  header: {
    height: 30,
    width: '100%',
    backgroundColor: 'pink'
  },
  row: {
    flexDirection: 'row'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16,
    color: 'grey'
  },
  image: {
    width: 350,
    height: 350
  },
  endListInfor:{
    flex:1,
    backgroundColor:'black',
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'red'
  }
});
