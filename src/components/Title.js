import React from 'react';

export default function Title({name,title}) {

        return (
            <div className="row">
                <div className="col-10 mx-auto my-2 text-center text-title mb-4">
                    <h1 className="text-capitalize font-weight-bold">
                        {name} <strong className="text-yellow">{title}</strong>
                    </h1>
                </div>
            </div>
        );

}