const { User, Driver, Order, Settlement } = require('../src/models');

async function cleanup() {
    try {
        console.log('Starting cleanup...');

        // Delete orders first (foreign key constraints)
        await Order.destroy({ where: {}, truncate: { cascade: true } });
        console.log('Orders & related data deleted');

        // Delete users with customer or driver role (keep admins)
        // This will cascadingly delete Drivers due to association if configured, 
        // but we'll do it explicitly if needed.
        await User.destroy({
            where: {
                role: ['customer', 'driver']
            }
        });
        console.log('Customer and Driver users deleted');

        console.log('Cleanup completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Cleanup failed:', error);
        process.exit(1);
    }
}

cleanup();
