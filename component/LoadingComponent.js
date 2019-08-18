import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native';
import { Card, Button } from 'react-native-elements';


export class News extends Component {

    constructor(props) {
        super(props)
    }

    renderArticleItem = ({ item }) => {
        console.log(item, "hello");
        // return (
        //     <Card title={item.title} image={item.urlToImage}>
        //         <View style={styles.row}>
        //             <Text style={styles.label}>Source</Text>
        //             <Text style={styles.info}>{item.source.name}</Text>
        //         </View>
        //         <Text style={styles}>{item.content}</Text>
        //         <View style={styles.row}>
        //             <Text style={styles.label}>Published</Text>
        //             <Text style={styles.info}>
        //                 {moment(item.publishedAt).format('LLL')}
        //             </Text>
        //         </View>
        //         <Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" />
        //     </Card>
        // );
    };
    render() {
        return (
            <View style={styles.container}>

                {/* <Card title={this.props.news[0].title}
                    image={{ uri: this.props.news[0].urlToImage }}>

                </Card> */}
                {/* <FlatList
                    data={this.props.news}
                    renderItem={this.renderArticleItem}
                    keyExtractor={item => item.title}
                /> */}
            </View>
        );
    }

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerFlex: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
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
    }
});

