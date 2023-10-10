import { InterBlockchain } from './interblockchain';
import { Blockchain1 } from './blockchain1';
import { Blockchain2 } from './blockchain2';

describe('InterBlockchain', () => {
    it('should demonstrate shared state', () => {
        const blockchain1 = Blockchain1();
        const blockchain2 = Blockchain2();
        const interBlockchain = InterBlockchain();

        // Add your test logic here
        // For example, you can check the shared state
        expect(interBlockchain.sharedState).toBeDefined();
    });
});
