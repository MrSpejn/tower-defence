const map = {
	player: {
		health: 32,
		initialGold: 200,
		availableTech: [],
	},
	enemies: {
		waves: [
			{
				time: 10,
				minions: [[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
			{
				time: 70,
				minions: [[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
			{
				time: 120,
				minions: [[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
			{
				time: 150,
				minions: [[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
			{
				time: 170,
				minions: [0[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
			{
				time: 180,
				minions: [[1,1,0.1],[1,1,0.3],[1,1,0.5],[1,1,0.7],[1,1,0.9],[1,1,1.1],[1,1,1.3],[1,1,1.5],[1,1,1.7]]
			},
		]
	},
	tracks: [
		[[0, 11], [8, 11], [10, 14], [10, 35], [12, 37], [23, 37], [24, 35], [24, 13], [27, 11], [36,11], [38, 14], [38, 31], [40, 32], [49, 32]],
		[[0, 12], [8, 12], [9, 14], [9, 35], [12, 38], [23, 38], [25, 35], [25, 13], [27, 12], [36,12], [37, 14], [37, 31], [40, 33], [49, 33]],
		[[0, 11], [8, 11], [10, 14], [10, 20], [12, 22], [23, 22], [24, 20], [24, 13], [27, 11], [36,11], [38, 14], [38, 31], [40, 32], [49, 32]],
		[[0, 12], [8, 12], [9, 14], [9, 20], [12, 23], [23, 23], [25, 20], [25, 13], [27, 12], [36,12], [37, 14], [37, 31], [40, 33], [49, 33]],
		[[0, 37], [23, 37], [24, 35], [24, 13], [27, 11], [36,11], [38, 14], [38, 31], [40, 32], [49, 32]],
		[[0, 38], [23, 38], [25, 35], [25, 13], [27, 12], [36,12], [37, 14], [37, 31], [40, 33], [49, 33]]
	],
	field_types: [
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	],
	heights: [
		[6,4,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,4,6],
		[4,5,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,5,4],
		[4,6,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,6,4],
		[4,4,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,5,7],
		[6,4,4,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,5],
		[5,5,4,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,4,6],
		[4,6,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,4,5],
		[4,4,3,3,3,3,3,3,3,3,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,4,5],
		[5,4,3,3,3,3,3,3,3,3,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,4,6],
		[6,5,3,3,3,3,3,3,3,3,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,4],
		[6,5,3,3,3,3,3,3,3,3,0,0,0,0,0,0,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,4,5],
		[6,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,7],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,2,2,2,2,2,2,2,2,3,0,0,0,0,3,3,3,3,3,3,3,3,5,7],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,1,1,1,1,1,1,2,3,-2,-2,-2,-2,3,3,3,3,3,3,3,3,5,6],
		[6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,0,0,0,0,0,1,2,3,-2,-2,-2,-2,3,3,3,3,3,3,3,3,4,6],
		[5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,0,-1,-1,-1,0,1,2,3,-2,-2,-2,-2,3,3,3,3,3,3,3,3,4,6],
		[4,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,0,-1,-2,-1,0,1,2,3,-2,-2,-2,-2,3,3,3,3,3,3,3,3,5,7],
		[5,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,0,-1,-1,-1,0,1,2,3,0,0,0,0,3,3,3,3,3,3,3,3,5,6],
		[6,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,0,0,0,0,0,1,2,3,0,0,0,0,3,3,3,3,3,3,3,3,4,5],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,1,1,1,1,1,1,1,2,3,0,0,0,0,3,3,3,3,3,3,3,3,4,4],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,2,2,2,2,2,2,2,2,2,3,0,0,0,0,3,3,3,3,3,3,3,3,5,4],
		[4,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,-4,-4,-4,-4,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,5,4],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,-4,-8,-8,-8,-8,-8,-8,-4,-1,3,5,7,7,6,5,3,0,0,0,0,0,3,3,3,3,3,3,3,3,4,7],
		[6,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,-4,-8,-8,-8,-8,-8,-8,-4,-1,3,5,7,7,6,5,3,0,0,0,0,0,3,3,3,3,3,3,3,3,4,5],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,-4,-8,-8,-8,-8,-8,-8,-4,-1,3,5,7,7,6,5,3,0,0,0,0,0,3,3,3,3,3,3,3,3,5,4],
		[5,4,3,3,3,3,3,3,3,3,0,0,0,0,0,0,0,0,0,-4,-8,-8,-8,-8,-8,-8,-4,-1,3,5,7,7,6,5,3,0,0,0,0,0,3,3,3,3,3,3,3,3,4,4],
		[4,6,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,6,8,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4],
		[5,3,3,3,3,3,3,3,3,3,0,0,0,0,3,6,7,10,8,9,7,8,10,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,3,8,9,10,9,11,9,10,7,9,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,6],
		[6,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,6,7,10,9,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,4],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,8,11,7,6,7,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,7,9,8,5,8,3,3,3,3,3,3,3,3,3,3,3, 3,3,3,3,3,3,3,3,3,3,3,4,5],
		[6,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,8,8,9,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5,4],
		[4,6,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,6,5,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[4,5,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,4],
		[6,5,3,3,3,3,3,3,3,3,0,0,0,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6],
		[6,5,3,3,3,3,3,3,3,3,0,0,0,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[4,4,3,3,3,3,3,3,3,3,0,0,0,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,6],
		[4,3,3,3,3,3,3,3,3,3,0,0,0,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,-4,-8,-8,-4,0,0,0,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
		[5,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[3,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,8,7,5,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
		[5,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,8,7,4,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4],
		[6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,6,5,9,7,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,5,6],
		[5,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,8,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4],
		[4,5,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,5],
		[5,6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,5],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,6],
		[6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4],
		[4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4],
		[6,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,0,0,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4]
	],
};
export default map;