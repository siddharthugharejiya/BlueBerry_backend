import paypal from '@paypal/checkout-server-sdk';

const clientId = "AWEBpoKx-YP5HE9H5zLQPk_8zxhwSspmDX6clmWlO6eoqMs2myKFEDrZNhueAFMvmiF5WbDhF1d8r7aM";
const clientSecret = "EHhKYNTfvsZLFihDF5Prf3q4Wg7nWkUK07crnR_-zeUrIp-dCJyvPEKCVvH94HS_f3FfshPMerU_zT8h";

// Sandbox for testing
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export { client };
