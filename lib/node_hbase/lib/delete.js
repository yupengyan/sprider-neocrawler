// Generated by CoffeeScript 1.8.0
(function() {
  var ByteBuffer, Delete, ProtoBuf, builder, proto,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ProtoBuf = require("protobufjs");

  ByteBuffer = require('protobufjs/node_modules/bytebuffer');

  ProtoBuf.convertFieldsToCamelCase = true;

  builder = ProtoBuf.loadProtoFile("" + __dirname + "/../proto/Client.proto");

  proto = builder.build();

  module.exports = Delete = (function() {
    function Delete(row, ts) {
      this.row = row;
      this.ts = ts;
      this.getRow = __bind(this.getRow, this);
      this.getFields = __bind(this.getFields, this);
      this._add = __bind(this._add, this);
      this.deleteFamily = __bind(this.deleteFamily, this);
      this.deleteFamilyVersion = __bind(this.deleteFamilyVersion, this);
      this.deleteColumns = __bind(this.deleteColumns, this);
      this.deleteColumn = __bind(this.deleteColumn, this);
      this.familyMap = {};
    }

    Delete.prototype.deleteColumn = function(cf, qualifier, timestamp) {
      return this._add(cf, qualifier, timestamp, 'DELETE_ONE_VERSION');
    };

    Delete.prototype.deleteColumns = function(cf, qualifier, timestamp) {
      return this._add(cf, qualifier, timestamp, 'DELETE_MULTIPLE_VERSIONS');
    };

    Delete.prototype.deleteFamilyVersion = function(cf, timestamp) {
      return this._add(cf, null, timestamp, 'DELETE_FAMILY_VERSION');
    };

    Delete.prototype.deleteFamily = function(cf, timestamp) {
      return this._add(cf, null, timestamp, 'DELETE_FAMILY');
    };

    Delete.prototype._add = function(cf, qualifier, timestamp, deleteType) {
      var _base;
      if (timestamp == null) {
        timestamp = ByteBuffer.Long.MAX_VALUE;
      }
      if ((_base = this.familyMap)[cf] == null) {
        _base[cf] = [];
      }
      return this.familyMap[cf].push({
        qualifier: qualifier,
        timestamp: timestamp,
        deleteType: deleteType
      });
    };

    Delete.prototype.getFields = function() {
      var cf, column, o, qualifiers, _ref;
      o = {
        row: this.row,
        mutateType: "DELETE",
        columnValue: []
      };
      _ref = this.familyMap;
      for (cf in _ref) {
        qualifiers = _ref[cf];
        column = {
          family: cf,
          qualifierValue: qualifiers.map(function(qualifier) {
            return qualifier;
          })
        };
        o.columnValue.push(column);
      }
      return o;
    };

    Delete.prototype.getRow = function() {
      return this.row;
    };

    return Delete;

  })();

}).call(this);