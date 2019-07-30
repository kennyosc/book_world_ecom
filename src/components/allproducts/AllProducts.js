import React, {Component} from 'react'

class AllProducts extends Component{
    render(){
        return(
            <div className='container'>
                <div className="row">
                                <div className="col-sm-12 col-lg-3 position-sticky">
                                    <div className="mt-4">
                                        <div className="mx-auto card">
                                            <div className="card-body">
                                                <div className="border-bottom border-secondary card-title">
                                                    <h1>Search</h1>
                                                </div>
                                                <div className="card-title mt-1">
                                                    <h4>Name</h4>
                                                </div>
                                                <form className="input-group"><input placeholder='Name'ref={input => this.name = input} className="form-control" type="text"/></form>
                                                <div className="card-title mt-1">
                                                    <h4>Price</h4>
                                                </div>
                                                <form className="input-group"><input placeholder="Minimum" ref={input => this.min = input} className="form-control mb-2" type="text" /></form>
                                                <form className="input-group"><input placeholder="Maximum" ref={input => this.max = input} className="form-control" type="text" /></form>
                                                <button onClick={this.onBtnSearch} className="btn btn-outline-secondary btn-block mt-5">Search</button>
                                            </div>
                                        </div>

                                        <div class="card my-3">
                                            <div class="card-header">
                                                <b>Categories</b>
                                            </div>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Fantasy</li>
                                                <li class="list-group-item">Non-Fiction</li>
                                                <li class="list-group-item">Fiction</li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            <div className='row col-sm-12 col-md-6 col-lg-9'>
                                
                            </div>
                        </div>
            </div>
        )
    }
}

export default AllProducts