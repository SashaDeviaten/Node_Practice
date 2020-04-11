const E_REQ = 'Required';

export function validateRequest(request) {
    const errors = {};

    for (let field in request) {
        if (Array.isArray(request[field])) {
            errors[field] = request[field].map(validateRequest);
        }
        else {
            if (request[field]) {
                switch (field) {
                    case 'URL': {
                        if (!(/https?:\/\//).test(request[field])) {
                            errors[field] = 'only absolute urls are supported'
                        }
                        break;
                    }
                }
            }
            else errors[field] = E_REQ
        }
    }

    return errors

}
