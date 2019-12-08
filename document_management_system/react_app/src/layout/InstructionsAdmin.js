import React, { Component } from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;


export class InstructionsAdmin extends Component {
     callback(key) {
        console.log(key);
      }
  render() { 
    return (
       <div className="container" id="instructions-container">
        <h4>Dokumentų valdymo sistemos instrukcija</h4>
        <p>Administratoriaus atmintinė</p>
          <Collapse id="accordion" onChange={this.callback}>
          <Panel header="Vartotojai" key="1">
              <p>Administratoriaus ir vartotojo sukūrimas.<br></br>
                  Administratoriaus paskyros kairiajame meniu pasirinkite mygtuką Vartotojai -> kurti vartotoją. <br></br>
                  Atsidariusioje formoje užpildykite lentelės grafas bei pasirinkite vartotojo grupę.<br></br>
                  Pasirinkus laukelį "Administratorius" sukurtam vartotojui bus priskirtos administratoriaus teisės.<br></br>
                  Paspauskite Saugoti.<br></br>
                  Naujas vartotojas - sukurtas.</p>
          </Panel>
          <Panel header="Administratoriaus teisės" key="2">
              <p>Sistemos vartotojus kuria ir informaciją redaguoja tik administratorius.<br></br>
              Administratorius gali peržiūrėti visus sukurtus sistemoje dokumentus bei vartotojus, gali trinti sukurtus vartotojus.<br></br>
              Administratorius gali kurti, trinti ir redaguoti vartotojų grupes. Priskirti vartotojus grupėms.<br></br>
              Administratorius gali kurti, trinti ir redaguoti dokumentų tipus.</p> 
          </Panel>
          <Panel header="Vartojų grupės ir dokumento tipai" key="3">
              <p>Administratoriaus paskyroje pasirinkite mygtuką Vartotojų grupės -> Pridėti naują. Suveskite grupės pavadinimą. Paspauskite Saugoti. Nauja grupė sukurta.<br></br>
              Administratoriaus paskyroje pasirinkite mygtuką Dokumentų tipai -> Pridėti naują. Įveskite dokumento tipo pavadinimą. Paspauskite Saugoti. Dokumento tipas sukurtas.<br></br>
              Priskirti dokumento tipą grupei -  meniu pasirinkite mygtuką Dokumento tipai -> "Peržiūrėti". </p>
          </Panel>
        </Collapse>
        </div>
    )}
       }

export default InstructionsAdmin
