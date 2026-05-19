import React from 'react';
// import './HotelsTable.css';

const PhoneIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l1.48-1.48a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const MapIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const hotels = [
  { id: 1,  name: 'Novotel Bheemili Resort',   type: '5star',   label: '★★★★★ 5 Star',  distance: '5.1 KM',  location: 'Bheemili',       phone: '+91 7779971602', website: 'https://all.accor.com/hotel/A121/index.en.shtml', mapUrl: 'https://maps.app.goo.gl/rbNDDaV5gjxF8RKH7' },
  { id: 2,  name: 'Sai Priya Beach Resorts',    type: '4star',   label: '★★★★ 4 Star',   distance: '22 KM',   location: 'Rushikonda',     phone: '+91 9951933444', website: 'http://www.saipriyabeachresorts.com/',             mapUrl: 'https://maps.app.goo.gl/eqGSxS7SZ3zKR3Cs8' },
  { id: 3,  name: 'Casa Beach Front',           type: '3star',   label: '★★★ 3 Star',   distance: '6.5 KM',  location: 'Bheemili',       phone: '+91 8977034487', website: 'https://www.casahotels.in/',                      mapUrl: 'https://maps.app.goo.gl/EmWkaVUUtipH9TzF9' },
  { id: 4,  name: 'Hotel Chandana',             type: '3star',   label: '★★★ 3 Star',   distance: '11 KM',   location: 'Gambhiram',      phone: '+91 9393426666', website: 'http://www.hotelchandanasquare.com/',              mapUrl: 'https://maps.app.goo.gl/5P8M1hQ8Yw7v3aVx9' },
  { id: 5,  name: 'Coral Beach Stays',          type: '3star',   label: '★★★ 3 Star',   distance: '3.6 KM',  location: 'Bheemili',       phone: '+91 9848939325', website: 'https://www.coralbeachstay.com/',                 mapUrl: 'https://maps.app.goo.gl/RGLFEhGHLHGa3N4Y7' },
  { id: 6,  name: 'The Bheemili House',         type: '4star',   label: '★★★★ 4 Star',  distance: '3.5 KM',  location: 'Bheemili',       phone: '+91 7569393019', website: 'https://bluejayresortbheemili.com/',              mapUrl: 'https://maps.app.goo.gl/5Kxn2YVAfRwyyiAR7' },
  { id: 7,  name: 'C. Pixels',                 type: 'service', label: 'Service Apt.',  distance: '3.6 KM',  location: 'Bheemili',       phone: '+91 6305065876', website: 'https://vishwamhotelsandresorts.com/',            mapUrl: 'https://maps.app.goo.gl/FQ4ZHfgCDDhsZcMb9' },
  { id: 8,  name: 'Vishwam Hotels & Resorts',   type: '3star',   label: '★★★ 3 Star',   distance: '1.7 KM',  location: 'Tagarapuvalasa', phone: '+91 9666544440', website: 'https://vishwamhotelsandresorts.com/',            mapUrl: 'https://maps.app.goo.gl/rGhx1ej2WfuHUHbq5' },
  { id: 9,  name: 'Sea Waves Holiday Homes',    type: 'service', label: 'Service Apt.',  distance: '5.4 KM',  location: 'Bheemili',       phone: '+91 7093905814', website: 'https://www.seabreeze.co.in/',                    mapUrl: 'https://maps.app.goo.gl/ZDztvdygUSgcgWmq7' },
  { id: 10, name: 'Sea Breeze Resorts',         type: 'service', label: 'Service Apt.',  distance: '5.4 KM',  location: 'Bheemili',       phone: '+91 9704408180', website: 'https://www.seabreeze.co.in/',                    mapUrl: 'https://maps.app.goo.gl/uRA6F4d2UbM55XPy8' },
];

const badgeClass = {
  '4star':   'ht-badge ht-badge--4star',
  '3star':   'ht-badge ht-badge--3star',
  'service': 'ht-badge ht-badge--service',
};

export default function HotelsTable() {
  return (
    <section className="ht-section">
      <div className="ht-container">

        {/* Header */}
        {/* <div className="ht-header">
          <div className="ht-eyebrow">
            <span className="ht-dot" />
            IAOMR PG Convention 2026 &nbsp;·&nbsp; Visakhapatnam
          </div>
          <h2 className="ht-title">Accommodation <span>Options</span></h2>
          <p className="ht-desc">
            Experience academic excellence beside the serene shores of Vizag.
            Special discounted tariff available for convention delegates.
          </p>
        </div> */}

        {/* Desktop Table */}
        <div className="ht-table-wrapper">
          <table className="ht-table">
            <colgroup>
              <col className="col-no" />
              <col className="col-name" />
              <col className="col-type" />
              <col className="col-dist" />
              <col className="col-loc" />
              <col className="col-ph" />
              <col className="col-web" />
              <col className="col-map" />
            </colgroup>
            <thead>
              <tr>
                <th className="ht ht-c">S.No</th>
                <th className="ht">Hotel Name</th>
                <th className="ht">Type</th>
                <th className="ht">Distance</th>
                <th className="ht">Location</th>
                <th className="ht">COntact info</th>
                <th className="ht">Website</th>
                <th className="ht ht-c">Map</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map(h => (
                <tr key={h.id} className="ht-tr">
                  <td className="td td-no">{h.id}</td>
                  <td className="td td-name">{h.name}</td>
                  <td className="td"><span className={badgeClass[h.type]}>{h.label}</span></td>
                  <td className="td">{h.distance}</td>
                  <td className="td">{h.location}</td>
                  <td className="td">
                    <a className="lk lk-ph" href={`tel:${h.phone.replace(/\s/g, '')}`}>
                      <PhoneIcon />{h.phone}
                    </a>
                  </td>
                  <td className="td">
                    <a className="lk lk-web" href={h.website} target="_blank" rel="noopener noreferrer">
                      <GlobeIcon />Visit Site
                    </a>
                  </td>
                  <td className="td td-c">
                    <a className="ht-map-btn" href={h.mapUrl} target="_blank" rel="noopener noreferrer">
                      <MapIcon />View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="ht-cards">
          {hotels.map(h => (
            <div key={h.id} className="ht-card">
              <div className="ht-card-head">
                <span className="ht-card-num">{h.id}</span>
                <span className="ht-card-name">{h.name}</span>
                <span className={badgeClass[h.type]}>{h.label}</span>
              </div>
              <div className="ht-card-body">
                <div className="ht-card-row">
                  <span className="ht-card-lbl">Distance</span>
                  <span>{h.distance} · {h.location}</span>
                </div>
                <div className="ht-card-row">
                  <span className="ht-card-lbl">Phone</span>
                  <a className="lk lk-ph" href={`tel:${h.phone.replace(/\s/g, '')}`}>
                    <PhoneIcon />{h.phone}
                  </a>
                </div>
                <div className="ht-card-actions">
                  <a className="lk lk-web" href={h.website} target="_blank" rel="noopener noreferrer">
                    <GlobeIcon />Website
                  </a>
                  <a className="ht-map-btn" href={h.mapUrl} target="_blank" rel="noopener noreferrer">
                    <MapIcon />View Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>


        <p className="ht-disclaimer">* Hotel tariffs may vary and are subject to applicable daily pricing policies.</p>
      </div>
    </section>
  );
}
