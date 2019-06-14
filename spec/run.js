import Jasmine from 'jasmine';

const jasmine = new Jasmine();
// modify this line to point to your jasmine.json
jasmine.loadConfigFile('Server/spec/support/jasmine.json');
jasmine.execute();
