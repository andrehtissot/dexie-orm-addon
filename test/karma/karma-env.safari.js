QUnit.assert.deepEqual = function( a, b, message ) {
  this.pushResult({
    result: JSON.stringify(a) === JSON.stringify(a),
    actual: JSON.stringify(a),
    expected: JSON.stringify(b),
    message: message || "These two objects should have the same values"
  });
};
