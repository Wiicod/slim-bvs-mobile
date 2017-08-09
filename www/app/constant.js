/**
 * Created by Ets Simon on 03/06/2017.
 */

config

    .constant('BASE_URL', {
        url: 'http://localhost:3000/',
        //apiEndpoint:'http://server.bvs.local/api'
        apiEndpoint:'http://cashandcarry-bvs.xs7ufxmfag.us-east-1.elasticbeanstalk.com/api' // test
        //apiEndpoint:'http://cashandcarry-prod.xs7ufxmfag.us-east-1.elasticbeanstalk.com/api' // prod
        //apiEndpoint:'http://server.slim.app/api'
    })
    .constant('APP_KEY', {

    })
    .constant('TVA', 0.1925);