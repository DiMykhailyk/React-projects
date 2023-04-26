import React, {useContext} from 'react';
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";

const BrandBar = observer(() => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex"
             style={{marginTop: "15px"}}>
            {device._brands.map(brand =>
                <Card
                    key={brand.id}
                    style={{cursor: 'pointer'}}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'primary' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    );
});

export default BrandBar;