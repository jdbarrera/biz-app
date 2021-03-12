const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
    apiKey: process.env.apikey,
    server: 'us1',
});

addMember = async (data) => {
    const response = await mailchimp.lists.addListMember('71eabc019e', data);
    return response;
}

exports.handler = async event => {
    // Only allow POST
    if (event.httpMethod !== 'POST') { 
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const addMemberResponse = await addMember(JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify(addMemberResponse),
    }
}