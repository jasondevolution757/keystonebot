
const dungeonConfig = {
	MoS:   "Maw of Souls",
	CoS:   "Court of Stars",
	LKara: "Lower Karazhan",
	UKara: "Upper Karazhan",
	HoV:   "Halls of Valor",
	DHT:   "Darkheart Thicket",
	NL:    "Neltharion's Lair",
	BRH:   "Black Rook Hold",
	Arc:   "The Arcway",
	VotW:  "Vault of the Wardens",
	EoA:   "Eye of Azshara",
	CoEN:  "Cathedral of Eternal Night"
}
var KeystonePlugin = function() { 
	var self = this;
	
	setKeystone = function() { 
		var dungeon = self._getDungeon(dungeon);
		console.log(dungeon);
		console.log(user);
		console.log(alt);
		console.log(level);
		if (dungeon != 'None') {
			self._addKeyToDataStore(user, alt, dungeon, level, status);
		}
	}	
}


/*}

class KeystonePlugin {     
	constructor(options) { 
		this.options = options;
		var data = [];
		var self = this;
	}

    setKeystone(user, alt, dungeon, level) { 
    	var dungeon = self._getDungeon(dungeon);
    	console.log(dungeon);
    	console.log(user);
    	console.log(alt);
    	console.log(level);
    	console.log(user);
    	if (dungeon != 'None') { 
			self._addKeyToDataStore(user, alt, dungeon, level, status);
    	}
    }

    unsetKeystone(user, alt) { 
    	self._removeKeyFromDataStore(user, alt);
    	for(var i in self.data[i]) { 
    		if (alt != '') { 
				if (self.data[i].user == user && self.data[i].alt == alt) { 
					self.data[i] = {};
				}
    		} else { 
    			if (self.data[i].user == user) { 
					self.data[i] = {};
    			}
    		}
    	}
    }

    depleteKeystone(user, alt) { 
    	for(var i in self.data[i]) { 
    		if (alt != '') { 
				if (self.data[i].user == user && self.data[i].alt == alt) { 
					self.data[i].status = 'depleted';
				}
    		} else { 
    			if (self.data[i].user == user) { 
    				self.data[i].status = 'depleted';
    			}
    		}
    	}
    }

    undepleteKeystone(user, alt, dungeon, level) { 
    	for(var i in self.data[i]) { 
    		if (alt != '') { 
				if (self.data[i].user == user && self.data[i].alt == alt) { 
					self.data[i].status = 'active';
				}
    		} else { 
    			if (self.data[i].user == user) { 
    				self.data[i].status = 'active';
    			}
    		}
    	}
    }

    resetKeystones() {
    	self.data = {};
    }

    displayKeystones() { 
    	var string = '';
    	for(var i in self.data[i]) { 
			string += self.data[i].user + self.data[i].alt + self.data[i].dungeon + self.data[i].level + self.detail[i].status + '\n';
    	}    	
    }

    _getDungeon(dungeon) { 
    	if (dungeon == '') { 
    		return "No dungeon was provided. You are bad and should feel bad.";
    	} else { 
    		// Test for a match against the dungeons available
    		// Full string match and abbreviations are both valid
    		var longRe = new RegExp(self.dungeonConfig.MoS, i);
    		var shortRe = new RegExp('mos', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.MoS;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.CoS, i);
    		var shortRe = new RegExp('cos', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.CoS;
    		} 
    		var longRe = new RegExp(self.dugneonConfig.LKara, i);
    		var shortRe = new RegExp('lkara', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.LKara;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.UKara, i);
    		var shortRe = new RegExp('ukara', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.UKara;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.HoV, i);
    		var shortRe = new RegExp('hov', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.HoV;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.DHT, i);
    		var shortRe = new RegExp('dht', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.DHT;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.NL, i);
    		var shortRe = new RegExp('nl', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.NL;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.BRH, i);
    		var shortRe = new RegExp('brh', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.BRH;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.Arc, i);
    		var shortRe = new RegExp('arc', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.Arc;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.VotW, i);
    		var shortRe = new RegExp('votw', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.VotW;
    		} 
    		var longRe = new RegExp(self.dungeonConfig.EoA, i);
    		var shortRe = new RegExp('eoa', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.EoA;
    		} 
    		var longRe = new RegExp(self.dugeonConfig.CoEN, i);
    		var shortRe = new RegExp('coen', i);
    		if (longRe.exec(dungeon) || shortRe.exec(dungeon)) { 
    			return self.dungeonConfig.CoEN;
    		} 
    	}
    }

    _addKeyToDataStore(user, alt, dungeon, level, status) {
    	var tempData = {};
    	tempData.user = user;
    	tempData.alt  = alt;
    	tempData.dungeon = dungeon;
    	tempData.level   = level;
    	tempData.status  = status;
    	self.data.push(tempData);    	
    }

    _removeKeyFromDataStore(user, alt) {
    	for(var i in self.data[i]) { 
			if (alt != '') { 
				if (self.data[i].user == user && self.data[i].alt == alt) { 
					self.data[i] = {};
				}
			} else { 
				if (self.data[i].user == user) { 
					self.data[i] = {};
				}
			}
    	}
   */ }
}