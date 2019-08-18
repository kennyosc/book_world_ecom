import React,{Component} from 'react'
import axios from '../../config/axios'

import Swal from 'sweetalert2'

class AddressInput extends Component{

    state={
        shipping:''
    }

    componentDidMount(){
        axios.get('/allshippingcity').then(res=>{
            this.setState({shipping:res.data})
        })
    }

    renderCity = () =>{
        return this.state.shipping.map(val=>{
            return(
                <option value={val.city}>{val.city}</option>
            )
        })
    }

    handleAddAddress = () =>{
        if(this.props.mainAddress === ''){
            var main_address = true
        }else{
            var main_address = this.main_address.checked
        }

        const address = this.address.value
        const city = this.city.value
        const postal_code = this.postal.value
        const user_id = this.props.user_id

        if(address === '' || city === '' || city === 'Choose...' || postal_code === ''){
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Please insert all the fields'
              })
        }else{
            axios.post('/newuseraddress',{user_id,address,city,postal_code,main_address}).then(res=>{
                console.log(res)
                if(res.data.affectedRows){
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Address added',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      window.location.reload()
                }else{
                    Swal.fire({
                        type: 'error',
                        title: 'Error',
                        text: res.data
                      })
                }
            })
        }
    }

    renderCheckMain = () =>{
        if(this.props.mainAddress===''){
            return(
                <div></div>
            )
        }else{
            return(
                <div className="form-group">
                    <div className="form-check">
                        <input ref={input=>this.main_address=input} className="form-check-input" type="checkbox" id="gridCheck"/>
                        <label className="form-check-label" for="gridCheck">
                            Set as main address
                        </label>
                    </div>
                </div>
            )
        }
    }

    render(){
        if(this.state.shipping !== ''){
            return(
                <div>
                    <form>
                        <div className="form-group">
                            <label for="inputAddress">Address</label>
                            <input ref={input=>this.address=input} type="text" className="form-control" id="inputAddress" placeholder="Jl. Jend. Sudirman No.Kav. 21, RT.10/RW.1"/>
                        </div>
                        
                        <div className="form-row">
                            
                            <div className="form-group col-md-4">
                                <label for="inputState">City</label>
                                <select ref={input=>this.city=input} id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    {this.renderCity()}
                                </select>
                            </div>
                            <div className="form-group col-md-4">
                                <label for="inputZip">Postal Code</label>
                                <input ref={input=>this.postal=input} type="text" className="form-control" id="inputZip"/>
                            </div>
                        </div>
                        {this.renderCheckMain()}
                        <button onClick={this.handleAddAddress} type="submit" className="btn btn-secondary mb-3" data-dismiss="modal">Add address</button>
                        </form>
                </div>
            )
        }else{
            return(
                <div>
                    Accessing Data...
                </div>
            )
        }
    }
}

export default AddressInput