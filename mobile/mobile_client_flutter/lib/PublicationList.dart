import 'package:flutter/material.dart';

class PublicationList extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _PublicationListState();
}

class _PublicationListState extends State<PublicationList> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lista publikacji'),
      ),
      body: Column(
        children: <Widget>[
          Text('Jestem publikacją')
        ],
      ),
    );
  }

}