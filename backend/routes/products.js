const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Obtener productos
router.get('/products', (req, res) => {
    const query = 'SELECT * FROM producto';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Actualizar lote al realizar una venta
router.post('/sell', (req, res) => {
    const { idproducto, cantidad } = req.body;
    const query = `
        SELECT * FROM lote 
        WHERE idproducto = ? 
        ORDER BY fechaCad ASC
    `;

    db.query(query, [idproducto], (err, lotes) => {
        if (err) return res.status(500).json({ error: err.message });

        let remaining = cantidad;
        const updates = [];

        for (const lote of lotes) {
            if (remaining <= 0) break;

            const toDeduct = Math.min(lote.cantidad, remaining);
            remaining -= toDeduct;

            updates.push(new Promise((resolve, reject) => {
                db.query(
                    `UPDATE lote SET cantidad = cantidad - ? WHERE idlote = ?`,
                    [toDeduct, lote.idlote],
                    (err) => {
                        if (err) reject(err);
                        resolve();
                    }
                );
            }));
        }

        Promise.all(updates)
            .then(() => res.json({ message: 'Venta realizada exitosamente' }))
            .catch((err) => res.status(500).json({ error: err.message }));
    });
});

module.exports = router;
