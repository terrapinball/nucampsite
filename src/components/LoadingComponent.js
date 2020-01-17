import React from 'react';

export const Loading = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-xs-1 mx-auto">
                    <i className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary" />
                    <p>Loading...</p>
                </div>
            </div>
        </div>
    );
};