import CommunicationController from "../Model/cc"
import StorageManager from "../Model/StorageManager"
import {myContext} from "../Context"
import { createContext, useContext } from 'react';




let sm = new StorageManager();



//const sid = "tjyMsrr3jClMozY6bg4R"
//const sid = useContext(myContext)
export default class TwokViewModel{
    static contextType = myContext
   




   async pictureStore(sid,uid){
     await CommunicationController.getPicture(sid, uid)
    .then(
        resultGetPicture => {
            
            sm.getUserPicture(resultGetPicture.uid,
                risultatoGetPicture => {
                if(risultatoGetPicture == 1){
                    if(resultGetPicture.picture==null){
                        sm.storeUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                            risultatoStorePicture => console.log('Nuovo utente inserito ', (risultatoStorePicture)),
                            error => console.log('errore in storeUserPicture', error)
                            )
                        console.log(resultGetPicture.pversion, risultatoGetPicture)
                    }else{
                    sm.storeUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                        risultatoStorePicture => console.log('Nuovo utente inserito ', (risultatoStorePicture)),
                        error => console.log('errore in storeUserPicture', error)
                        )
                    console.log(resultGetPicture.pversion, risultatoGetPicture)
                 } }},
                error => console.log('errore in getUserPicture', error)
                )
        }
)
   }
   
    
    
/*
    async handleStoreUserPicture(sid, uid){
        
        await CommunicationController.getPicture(sid, uid)
                .then(
                    resultGetPicture => {
                        console.log(resultGetPicture.picture)
                        sm.getUserPicture(resultGetPicture.uid,
                            risultatoGetPicture => {console.log('il risultato del GetPicture:', risultatoGetPicture); if(risultatoGetPicture == 1){
                                console.log('entro')
                                sm.storeUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                                    risultatoStorePicture => console.log('Nuovo utente inserito ', (risultatoStorePicture)),
                                    error => console.log('errore in storeUserPicture', error)
                                    )
                                console.log(resultGetPicture.pversion, risultatoGetPicture)
                            }else if((resultGetPicture.pversion) < (risultatoGetPicture.pVersion)){
                                sm.updateUserPicture(resultGetPicture.uid, resultGetPicture.pversion, resultGetPicture.picture,
                                    risultatoUpdate => console.log('Immagine utente aggiornata', risultatoUpdate),
                                    error => console.log('errore in UpdateUser', error)
                                    )
                            }else {
                                console.log('non dobbiamo aggiornare niente')
                            }},
                            error => console.log('errore in getUserPicture', error)
                            )
                    }
    )}
    */
    controllo(lista,twok){
        for (const key in lista) {
            if(key.tid == twok.tid){
                return true
            }else{
                return false
            }
        }
    }
    async createList(sid) {
        twoks = []
        //console.log("prova"+sid)
       // console.log("sid"+sid)
        for(i=0;i < 10; i++){

             await CommunicationController.getTwok(sid).then(
                
               ris => {
                 //   if(this.controllo(twoks,ris)){
                 //       console.log("esiste gia")
                 //   }else{
                       this.pictureStore(sid, ris.uid)
                        twoks.push(ris)
                   // }
               }
             )
        }
        
        

        //console.log(listaTwok)

        return twoks
    }
    async createUidList(sid,uid) {
        lista = []
        //console.log("prova"+sid)
       // console.log("sid"+sid)
        for(i=0;i < 3; i++){

             await CommunicationController.getTwok(sid,uid).then(
                
                ris => {
                    if(this.controllo(lista,ris)){
                        console.log("esiste gia")
                    }else{
                   //     this.pictureStore(sid, ris.uid)
                        lista.push(ris)
                    }
                }
             )
        }
        
        

        //console.log(listaTwok)

        return lista
    }

   async addOneUidTwok(list,sid,uid){
    await CommunicationController.getTwok(sid,uid).then(ris =>
            {
                if(this.controllo(list,ris)){
                    console.log("esiste gia")
                }else{
                    this.pictureStore(sid, ris.uid)
                    list.push(ris)
                }
            }
         )
    return list
   }
    
   async addOneTwok(list,sid){
      await CommunicationController.getTwok(sid).then(ris => 
        {

           // if(this.controllo(list,ris)){
                console.log("esiste gia")
           // }else{
               // this.pictureStore(sid, ris.uid)
                list.push(ris)
           // }
        }
       
        
        
      )
      return list
   }

    

}
