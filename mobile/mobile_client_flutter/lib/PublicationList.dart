import 'dart:convert';
import 'dart:developer' as developer;

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class PublicationList extends StatefulWidget {
  final String login;

  PublicationList({Key key, @required this.login}): super(key: key);

  @override
  State<StatefulWidget> createState() => new _PublicationListState();
}

class _PublicationListState extends State<PublicationList> {

  _PublicationListState() {

  }

  final publicationApiBase = 'http://localhost:8090';
  final actions = Map<String, dynamic>();

  final listItems = ['Item 1', 'Item 2'];

//  addItem() {
//    setState(() {
//      listItems.add('a');
//    });
//  }

  void fetchActions() async {
    developer.log('hi');
    final url = publicationApiBase;
    final response = await http.get(url);
    final data = jsonDecode(response.body);

    var a = actions;
    debugPrint('Hi');

    setState(() {
      actions.clear();
      actions.addAll(data['_links']);
    });
  }

  void fetchPublications() async {
    final url = publicationApiBase;
    final response = await http.get(url);
    final data = jsonDecode(response.body);

    debugPrint('done');
  }

  ListTile _buildListItem(String text) {
    return ListTile(
      title: Text(text)
    );
  }

  Widget _buildList() {
    return ListView.builder(
      padding: EdgeInsets.all(16.0),
      itemCount: listItems.length,
      itemBuilder: (context, i) {
        return _buildListItem(listItems[i]);
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    developer.log('Building...');
    developer.log(listItems.length.toString());

    return Scaffold(
      appBar: AppBar(
        title: Text('Lista publikacji'),
      ),
      body: Center(
        child: _buildList(),
//        child: ListView(
//          children: <Widget>[
//            ListTile(
//              leading: Icon(Icons.map),
//              title: Text('Map'),
//            ),
//            ListTile(
//              leading: Icon(Icons.photo_album),
//              title: Text('Album'),
//            ),
//            ListTile(
//              leading: Icon(Icons.phone),
//              title: Text('Phone'),
//            ),
//          ],
//        ),
      ),
    );
  }

}