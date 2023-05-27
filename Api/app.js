require("dotenv").config()

const createError = require('http-errors')
const express = require("express");
const logger = require("morgan")
const mongoose = require("mongoose");

require("./config/db.config");

const app = express();

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "https://lechuza7-xancampos-web.netlify.app");
  res.set("Access-Control-Allow-Headers", "content-type");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization");
  res.set("Content-Security-Policy", "font-src data:font/truetype;charset=utf-8;base64,d09GRgABAAAAALY3ABIAAAABztAAAAAAAAC1QAAAAPcAAAHiAAAAAAAAAABHUE9TAACV9AAAFxIAAHKy/pn970dTVUIAAK0IAAAINQAAFD6g2KReTFRTSAAABtQAAAA6AAACQeO3nq5PUy8yAAACDAAAAFMAAABgZoZye2NtYXAAABxsAAADdwAABTpa8HPyY3Z0IAAAIbAAAAAoAAAAKAhGAbdmcGdtAAAf5AAAAQUAAAFzBpmcN2dhc3AAAJXoAAAADAAAAAwABwAHZ2x5ZgAAJkQAAGT0AADhaCjCChFoZG14AAAHEAAAFVwAADPIhU9AOGhlYWQAAAGUAAAANQAAADYFph12aGhlYQAAAcwAAAAgAAAAJAc2BPtobXR4AAACYAAABHEAAAj0jIVtDGxvY2EAACHYAAAEbAAABHyCc7p8bWF4cAAAAewAAAAgAAAAIARXAjxuYW1lAACLOAA...SCThVMYJIqZCqSu4rDezyzyKpY17tqhUyLsX30L+SQltAyggVZVqVMsLfPk1CNKvWoXtPreoMd2Ymd2YVd2S2+tbRTX92te3Sv7tP9egCjlnZ0oid96c/8LMkyrMgarMP67MDvNkYxV0uGjvOJFo+33umRlTnS48NR0ehv5tf6D/25M7IAAAB4AYVRRXfDMAz+K3q+jBc4DVyPmfGu56iNk9bKc9QO/ny5Y7iJP5DukGCGgtCjUDv2DZWsxsroHvmMA3jsUEM9TnoQx8NmHEMax+sKuqHdULlItRFFljsdCtZhW14qWh2mCiKj286Srwlc9vMROJ8M/Hcsak/njBZ6FrPHXtAKON/k7e/j0OQAb9h+mHVQhtg6Gm/r2TmjLVcvwbVymR6e31sY89p7uwn3o6Nvmx8XAmbUwVBOd48CVrkrwdWA8NYEbn69Ft3Z/AmDvFqGE2/fj78tvTlH0w9MfcpAGK7ZliRjjd2agD20SKpx8c34aPZXMwDpj6h5")
  next();
});

app.use(express.static(`${__dirname}/react-app`))

app.use(express.json());
app.use(logger('dev'));

const { session, loadUser } = require("./config/session.config");
app.use(session);
app.use(loadUser);

const routes = require("./config/routes.config")
app.use('/api/v1', routes)

// app.use((req, res, next) => next(createError(404, "Page not found")));

app.use((error, req, res, next) => {
  const data = {};
  console.error(error);

  if (error instanceof mongoose.Error.ValidationError || error.status === 400) {
    error.status = 400;
    data.errors = error.errors;
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, "Resource not found");
  }

  data.message = error.message;

  res.status(error.status || 500);
  res.send(data);
});

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Xan Campos website api running at port ${port}`)
);

module.exports = app;
