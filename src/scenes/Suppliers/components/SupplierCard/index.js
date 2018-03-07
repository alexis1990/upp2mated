import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row, OverlayTrigger, Tooltip, Glyphicon } from 'react-bootstrap';


const tooltipVatNumber = (
  <Tooltip>
    <strong>Lorem ipsum onrli ielero poieun zneu alm</strong> Lorem ipsum onrli ielero
  </Tooltip>
);
const tooltipSiret = (
  <Tooltip>
    <strong>Lorem ipsum onrli ielero poieun zneu alm</strong> Lorem ipsum onrli ielero
  </Tooltip>
);
const tooltipBuns = (
  <Tooltip>
    <strong>Lorem ipsum onrli ielero poieun zneu alm</strong> Lorem ipsum onrli ielero
  </Tooltip>
);

const SupplierCard = ({ supplier }) => (
  <Row className="show-grid">
    <Col xs={12} md={12} lg={12}>
      <Row>
        <Col xs={3} md={3} lg={3}>Status</Col>
        <Col xs={9} md={9} lg={9}>{supplier.state}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Nom</Col>
        <Col xs={9} md={9} lg={9}>{supplier.name}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Capital Social</Col>
        <Col xs={9} md={9} lg={9}>{supplier.socialCapital}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Siège Social</Col>
        <Col xs={9} md={9} lg={9}>{supplier.headquarterAdress}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Activités Principales</Col>
        <Col xs={9} md={9} lg={9}>{supplier.principalActivites}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>
          N° de TVA Intracommunautaire
          <OverlayTrigger placement="top" overlay={tooltipVatNumber}>
            <Glyphicon glyph="info-sign" className="information" />
          </OverlayTrigger>
        </Col>
        <Col xs={9} md={9} lg={9}>{supplier.intraCommunityVatNumber}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>
          SIRET
          <OverlayTrigger placement="top" overlay={tooltipSiret}>
            <Glyphicon glyph="info-sign" className="information" />
          </OverlayTrigger>
        </Col>
        <Col xs={9} md={9} lg={9}>{supplier.siret}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>
          Buns
          <OverlayTrigger placement="top" overlay={tooltipBuns}>
            <Glyphicon glyph="info-sign" className="information" />
          </OverlayTrigger>
        </Col>
        <Col xs={9} md={9} lg={9}>{supplier.buns}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Catégories d'achats</Col>
        <Col xs={9} md={9} lg={9}>{supplier.purchaseCategorySet}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Organisation</Col>
        <Col xs={9} md={9} lg={9}>{supplier.organization}</Col>
      </Row>
      <Row>
        <Col xs={3} md={3} lg={3}>Centre des coûts</Col>
        <Col xs={9} md={9} lg={9}>{supplier.costCenter}</Col>
      </Row>
    </Col>
  </Row>
);

SupplierCard.Proptypes = {
  supplier: PropTypes.shape({
    name: PropTypes.string.isRequired,
    socialCapital: PropTypes.string.isRequired,
    headquarterAdress: PropTypes.string.isRequired,
    principalActivites: PropTypes.array,
    intraCommunityVatNumber: PropTypes.string.isRequired,
    siret: PropTypes.string.isRequired,
    buns: PropTypes.string.isRequired,
    purchaseCategorySet: PropTypes.array,
    organization: PropTypes.string.isRequired,
    costCenter: PropTypes.string.isRequired,
  }),
};

export default SupplierCard;
