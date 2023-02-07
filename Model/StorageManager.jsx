import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommunicationController from "./cc";
let db = SQLite.openDatabase("myDB");
export default class StorageManager {
   
 constructor() {
    
    const query = "CREATE TABLE IF NOT EXISTS PROFILO (uid INTEGER PRIMARY KEY, pVersion INTEGER, picture STRING)";
    db.transaction(tx => {
    tx.executeSql(query);
    });
 
 }
 static async checkFirstRun(){
    const sid = await AsyncStorage.getItem("sid")
    if (sid) {
        console.log("Siamo già loggati " + sid)
    } else {
        console.log('first run')
        await CommunicationController.register()
        .then(result => AsyncStorage.setItem('sid', result.sid))
    }
    return sid;
}

static async getSid(){
    const sid = await AsyncStorage.getItem("sid")
    return sid
}

 getUserPicture(uid, onResult, onError){
    //console.log(uid)
    const transaction = (tx) =>{
        let query = 'SELECT picture, pVersion from PROFILO where uid = ?'
        tx.executeSql(query, [uid],
            (tx, queryResult) => {
                if(queryResult.rows.length > 0) {
                    onResult(queryResult.rows._array[0])
                } else {
                    onResult(1)
                }
            }, 
            (tx, error) => {
                onError('errore in getUserPicture:' +error)
            }

            )}
    const error = (e) => {onError(e)};
    db.transaction(transaction, error);
};

storeUserPicture(uid, pVersion, picture, onResult, onError){
    console.log(uid, pVersion, picture)
    const transaction = (tx) =>{
        let query = "INSERT INTO PROFILO VALUES(?, ?, ?)";
        tx.executeSql(query, [uid, pVersion, picture],
            (tx, queryResult) => {  
                if (queryResult.rows.length > 0) {
                    onResult(queryResult.rows._array[0].value)
                } else {
                    onResult("")
                }
            },
            (tx, error) => {
                onError(error)
            }
            )}

    const error = (e) => {onError(e)};
    db.transaction(transaction, error);



}
}
