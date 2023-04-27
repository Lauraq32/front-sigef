module.exports = {
	extends: ['@commitlint/config-conventional'],
	parserPreset: {
		parserOpts: {
			headerPattern: /^([A-Z]+-\d+)(?:\((.*)\))?!?: (.*)$/,
		},
	},
	plugins: [
		{
			rules: {
				'match-team-pattern': (parsed) => {
					const { type, scope, subject } = parsed;
					if (type === null && scope === null && subject === null) {
						return [
							false,
							[
								"🛑 allow commit messages format 'CG-24: subject'",
								" 'CG-24(fix): subject'",
								" 'CG-24(fix)!: subject'",
							],
						];
					}
					return [true, '✨'];
				},
			},
		},
	],
	rules: {
		'type-case': [2, 'always', 'upper-case'],
		'match-team-pattern': [2, 'always'],
		'type-enum': [2, 'never'],
	},
};
