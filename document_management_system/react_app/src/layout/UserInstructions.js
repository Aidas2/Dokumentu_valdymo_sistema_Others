import React, { Component } from 'react';
import { Collapse } from 'antd';

const Panel = Collapse.Panel;


export class UserInstructions extends Component {
     callback(key) {
        console.log(key);
      }
  render() { 
    return (
       <div className="container" id="instructions-container-user">
        <h4>Dokumentų valdymo sistemos instrukcija</h4>
        <p>Vartotojo atmintinė</p>
          <Collapse id="accordion" onChange={this.callback}>
          <Panel header="Paskyra" key="1">
              <p>Vartotojo duomenys<br></br>
              Norėdami matyti savo paskyros duomenis Vartotojo paskyros kairiajame meniu paspauskite ID ikonytę. Atsidariusiame lange matysite savo  duomenis, kontaktinę informaciją, administratoriaus Jums priskirtą rolę bei grupes, kurioms priklausote.</p>
          </Panel>
          <Panel header="Paieška" key="2">
              <p> Norėdami atlikti dokumento ar vartotojo paiešką, eikite į vartotojo paskyros pradinį puslapį.<br></br>
              </p> 
          </Panel>
          <Panel header="Dokumentai" key="3">
              <p>Dokumento sukūrimas<br></br>
                Vartotojo  paskyros kairiajame meniu paspauskite KURTI DOKUMENTĄ. Atsidariusioje formoje užpildykite visus laukelius, pasirinkite dokumento tipą. Jei reikia pridėti papildomą failą ar failus, apatiniame formos laukelyje pasirinkite failą ir paspauskite SAUGOTI DOKUMENTĄ. Naujas dokumentas - sukurtas. <br></br>
                Dokumento redagavimas <br></br>
                Norėdami dokumentą redaguoti vartotojo paskyros kairiajame meniu pasirinkite DOKUMENTAI -> SIUNČIAMI. <br></br>
                Svarbu: redaguoti, papildyti galima tik neišsiųstus dokumentus.
                Paspauskite redagavimo ikonytę formos dešinėje ir atsidariusiame dokumento lange, galėsite pridėti papildomus dokumentus, dokumentą pateikti arba jį ištrinti.<br></br>
                Norėdami redaguoti dokumento pavadinimą bei aprašymą, paspauskite dokumento numerį. Atsidariusiame lange redaguokite norimą informaciją. Norėdami išsaugoti - spauskite IŠSAUGOTI.<br></br>
                Dokumentų peržiūrėjimas<br></br>
                Vartotojo paskyros šoniniame meniu pasirinkite mygtuką DOKUMENTAI. Atsidariusiame lange matysite siunčiamus ir gautus dokumentus. Pasirinkus gautą dokumentą jį galėsite patvirtinti arba atmesti.
                Norėdami patvirtinti - spauskite PATVIRTINTI DOKUMENTĄ.
                Norėdami atmesti - spauskite ATMESTI DOKUMENTĄ. 
                Atsidariusiame lange nurodykite dokumento atmetimo priežastį ir spauskite SIŲSTI ATSAKYMĄ.<br></br>
                 </p>
          </Panel>
          <Panel header="Statistika" key="4">
              <p>Norėdami peržiūrėti dokumentų statistiką vartotojo paskyros kairiajame meniu pasirinkite STATISTIKA. Atsidariusioje statistikos formoje nurodykite periodą, pasirinkto dokumento tipą bei pažymėkite būseną. Paspauskite PATEIKTI UŽKLAUSĄ.<br></br>
              Norint surasti vartotojų, kurie pateikė dokumentus tam tikrai grupei, statistiką, žemesnėje formoje pasirinkite grupę ir paspauskite PATEIKTI UŽKLAUSĄ.<br></br>
              </p>
          </Panel>
        </Collapse>
        </div>
    )}
    }

export default UserInstructions
