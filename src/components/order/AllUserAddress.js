import React, {Component} from 'react'
import axios from '../../config/axios';

class AllUserAddress extends Component{

    state={
        address_list:[]
    }

    componentDidMount(){
        axios.get(`/getalluseraddress/${this.props.user_id}`).then(res=>{
            this.setState({address_list:res.data})
        })
    }

    handleSelectAsMain = (address_id) =>{
        axios.patch(`/setaddressasmain/${this.props.user_id}/${address_id}`).then(res=>{
            window.location.reload()
        })
    }

    renderList = () =>{
        return this.state.address_list.map((val,index)=>{
            if(val.main_address === 0){
                return(
                    <div>
                        <li class="list-group-item"><b>{index+1}. {val.order_recipient}, ({val.phone_number}): </b>{val.address.concat(` , ${val.city}, ${val.postal_code}`)}
                        <p className='mt-2'>
                            <b><button onClick={()=>this.handleSelectAsMain(val.id)} style={{fontSize:'0.7em'}} className='btn btn-light mr-3'>Set as main address</button></b>
                        </p>
                        </li>
                    </div>
                )
            }else{
                return(
                    <div>
                        <li class="list-group-item"><b>{index+1}. {val.order_recipient}, ({val.phone_number}): </b>{val.address.concat(` , ${val.city}, ${val.postal_code}`)}
                        <p className='mt-2'>
                            <b><button style={{fontSize:'0.7em'}} className='btn btn-success disabled'>Main Address</button></b>
                        </p>
                        </li>
                    </div>
                )
            }
        })
    }

    render(){
        return(
            <div>
                <ul class="list-group list-group-flush">
                    {this.renderList()}
                </ul>
            </div>
        )
    }
}

export default AllUserAddress