import 'package:flutter/material.dart';
import 'utils.dart';

class LoginScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => new _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final Map<String, String> credentials = {'jan':'AAA', 'zupan':'gros', 'Atrox': 'password'};
  final TextStyle textStyle = TextStyle(fontSize: 20.0);

  final loginController = TextEditingController();
  final passwordController = TextEditingController();

  void handleSubmit() {
    var login = loginController.text;
    if (!credentials.containsKey(login)) {
      Utils.displayAlert(context, 'Niepoprawne dane', 'Błędny login');
      return;
    }
    if (credentials[login] != passwordController.text) {
      Utils.displayAlert(context, 'Niepoprawne dane', 'Błędne hasło');
      return;
    }

    
  }

  @override
  void dispose() {
    loginController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loginField = TextField(
      controller: loginController,
      obscureText: false,
      style: textStyle,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Login",
          border:
          OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
    );

    final passwordField = TextField(
      controller: passwordController,
      obscureText: true,
      style: textStyle,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
          hintText: "Hasło",
          border:
          OutlineInputBorder(borderRadius: BorderRadius.circular(32.0))),
    );

    final loginButon = Material(
      elevation: 5.0,
      borderRadius: BorderRadius.circular(30.0),
      color: Color(0xff01A0C7),
      child: MaterialButton(
        minWidth: MediaQuery.of(context).size.width,
        padding: EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
        onPressed: handleSubmit,
        child: Text("Zaloguj",
            textAlign: TextAlign.center,
            style: textStyle.copyWith(
                color: Colors.white, fontWeight: FontWeight.bold)),
      ),
    );

    return Scaffold(
      body: Center(
        child: Container(
          color: Colors.white,
          child: Padding(
            padding: const EdgeInsets.all(36.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                SizedBox(
                  height: 50.0,
                  width: MediaQuery.of(context).size.width,
                  child:
                    Material(
                      elevation: 5,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          Text('Bibliograpy Cloud App', style: textStyle,)
                        ],
                      ),
                    )
                ),
                SizedBox(height: 45.0),
                loginField,
                SizedBox(height: 25.0),
                passwordField,
                SizedBox(
                  height: 35.0,
                ),
                loginButon,
                SizedBox(
                  height: 15.0,
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

}