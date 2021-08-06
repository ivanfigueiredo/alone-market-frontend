import React from 'react';
import QRCode from 'react-qr-code';

export class ExportItemToQRCode extends React.PureComponent {     
  render() {         
    return (
      <div class="d-flex flex-wrap">        
        {this.props.itemsParaQRCode.map((item, index) =>{                            
            return(
              <div style={{padding: 20}} key={index} className="signature" className="content-wrapper">                                                               
                <label style={{fontSize: 20}}>{item.codigoDeBarras}<br />{item.dataValidade}<br />{item.name}</label>                                                                                                                     
                  <p style={{marginRight: 30, marginTop: 10, flexWrap:"wrap"}}>                                                
                    <QRCode 
                        value={item.codigoDeBarras + "  " +"Val-"+item.dataValidade}
                        size={150}
                        level={"L"}
                        includeMargin={false}                                                        
                    />
                  </p>                                                                                                                                                                                        
              </div>                      
            );                                      
          })
        }          
      </div>                                              
    );
  }
}
               
  

