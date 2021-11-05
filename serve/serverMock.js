const winston = require('winston');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const debtsPubData = require('./data/debtPub/debtsPubData.json');
const agreementsData = require('./data/agreements.json');
const documentTypesData = require('./data/documentTypes.json');
const shippingsPubData = require('./data/shippingPub/shippingsPubData.json');
const defaultShippingData = require('./data/shippingPub/defaultShippingData.json');
const rejectedShippingData = require('./data/shippingPub/rejectedShippingData.json');
const authorizedShippingData = require('./data/shippingPub/authorizedShippingData.json');
const publicationData = require('./data/publicationType.json');
const signersData = require('./data/shippingPub/signersData.json');

const app = express();
dotenv.config();
let i = 0;
const { PORT, SERVER_PORT } = process.env;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

const getOptionsCors = () => {
  const whitelist = [`https://localhost:${PORT}`, `http://localhost:${PORT}`, 'https://dev.apps.ocp.ar.bsch'];
  const corsOptions = {
    origin: (origin, callback) => {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    exposedHeaders: ['filename']
  };
  return corsOptions;
};
app.use(cors(getOptionsCors()));
app.get('/live', (req, res) => {
  res.send('App live!');
});
app.get('/agreements', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      res.send(agreementsData);
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/shipping/:id', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      const shipping = shippingsPubData.shippingsInfo.find(shippingItem => shippingItem.id === req.params.id);
      if (shipping) {
        if (shipping.status === 'Autorizada') {
          res.send(authorizedShippingData);
        } else {
          const data = defaultShippingData;
          data.status = shipping.status;
          res.send(data);
        }
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    } else {
      res.status(500).send({ message: 'error' });

      if (i > 5) {
        i = 0;
      } else {
        i += 1;
      }
    }
  }, 500);
});

app.get('/shipping/:id/rejected', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      const { formatType } = req.query;
      if (formatType === 'json') {
        res.send(rejectedShippingData);
      } else {
        res.set({
          'Content-Type': 'text/html; charset=utf-8',
          filename: 'R305396791000001020704722F20210601-H113514.TXT'
        });
        res.download('./serve/data/shippingPub/rejectedShippingFile.txt');
      }
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/shippings', (req, res) => {
  const { limit, offset } = req.query;
  setTimeout(() => {
    if (i < 4) {
      const data = { ...shippingsPubData };
      data.offset = offset;
      data.limit = limit;
      data.shippingsInfo = data.shippingsInfo.slice(Number(offset), Number(offset) + Number(limit));
      res.send(data);
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.delete('/shipping/:id', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      res.status(204).send();
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/shippings/:id/signers', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      res.send(signersData);
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/comprobants/types', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      res.send(documentTypesData);
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/publicationTypes', (req, res) => {
  setTimeout(() => {
    if (i < 4) {
      res.send(publicationData);
    } else {
      res.status(500).send({ message: 'error' });
    }
    if (i > 5) {
      i = 0;
    } else {
      i += 1;
    }
  }, 500);
});

app.get('/debts', (req, res) => {
  const { limit, offset, type } = req.query;
  if (i < 4) {
    if (type) {
      if (type === 'all_csv') {
        setTimeout(() => res.download('./serve/data/debtPub/deudaPublicada.csv'), 1000);
      } else if (type === 'yesterday_csv') {
        setTimeout(() => res.download('./serve/data/debtPub/deudaPublicadaAcuerdo.csv'), 1000);
      }
    } else {
      setTimeout(
        () =>
          res.send({
            total: debtsPubData.total,
            debts: debtsPubData.debts.slice(Number(offset), Number(offset) + Number(limit))
          }),
        1000
      );
    }
  } else {
    res.status(500).send({ message: 'error' });
  }
  if (i > 5) {
    i = 0;
  } else {
    i += 1;
  }
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
app.listen(SERVER_PORT || 3095, () => logger.info(`Mock app in port${SERVER_PORT}!`));
