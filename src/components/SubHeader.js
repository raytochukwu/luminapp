import React from 'react';
import './SubHeader.css';

export const SubHeader = () => {
    return (
        <section class="sub-header">
            <div class="row">
                <div class="col-md-8">
                    <h1>All Products</h1>
                    <p>A 360° look at Lumin</p>
                    </div>
                    <div class="col-md-4">
                    <div class="h-100 d-flex align-items-center">
                        <select class="form-select">
                            <option disabled="">Filter By</option>
                            <option value="1">All Products</option>
                            <option value="2">New Products</option>
                            <option value="3">Sets</option>
                            <option value="3">Skin Care</option>
                            <option value="3">Hair &amp; Body Care</option>
                            <option value="3">Accessories</option>
                            </select>
                            </div>
                            </div>
                            </div>
                            </section>
    )
}
export default SubHeader
