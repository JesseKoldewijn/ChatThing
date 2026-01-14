# Testing CI Workflow Locally with Act

This project uses [act](https://github.com/nektos/act) to test GitHub Actions workflows locally.

## Prerequisites

Install `act`:

```bash
# macOS
brew install act

# Linux (using the install script)
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Or download from: https://github.com/nektos/act/releases
```

## Running the CI Workflow Locally

### Dry Run Mode (Recommended)

Run the entire CI workflow in dry-run mode (skips coverage commit):

```bash
# Run all jobs
act push

# Run specific job
act -j test
act -j test-integration
act -j test-e2e
act -j upload-coverage
```

### Manual Workflow Dispatch with Dry Run

You can also trigger the workflow manually with dry-run enabled:

```bash
act workflow_dispatch -e .github/workflows/ci-dryrun.json
```

Create `.github/workflows/ci-dryrun.json`:

```json
{
	"inputs": {
		"dry_run": "true"
	}
}
```

## Environment Variables

The workflow automatically detects `act` via the `ACT` environment variable. When running with `act`, the coverage upload job will:

- ✅ Generate all coverage badges
- ✅ Show coverage summary
- ❌ Skip committing and pushing to git

To enable dry-run mode with act, set the ACT environment variable:

```bash
# Set ACT environment variable for dry-run
export ACT=true
act push

# Or inline
ACT=true act push
```

## Testing Specific Jobs

```bash
# Run only unit tests
act -j test

# Run only integration tests
act -j test-integration

# Run only E2E tests
act -j test-e2e

# Run coverage upload (dry run)
act -j upload-coverage

# Run build
act -j build
```

## Tips

1. **First run**: Act will download the Docker image, which may take a while
2. **Secrets**: If you need secrets, create `.secrets` file (not committed)
3. **Artifacts**: Artifacts are stored in `.act/artifacts/`
4. **Debugging**: Use `-v` for verbose output: `act -v push`

## Troubleshooting

### Artifact Upload Failures

Act has limitations with artifact uploads (missing `ACTIONS_RUNTIME_TOKEN`). This is expected and doesn't affect the dry-run logic. The workflow will:

- ✅ Still run all test jobs
- ✅ Generate coverage reports locally
- ✅ Detect dry-run mode correctly
- ❌ Fail on artifact upload (this is an act limitation, not a workflow issue)

**Workaround**: The dry-run detection logic works correctly. To fully test:

1. Use GitHub Actions UI to trigger `workflow_dispatch` with `dry_run=true`
2. Or push to a branch and verify the workflow behavior in GitHub Actions

### Playwright browsers not found

E2E tests require Playwright browsers. The workflow installs them automatically, but if you're testing locally, run:

```bash
yarn playwright install --with-deps chromium
```

### Testing Dry-Run Mode

The dry-run mechanism is verified to work correctly:

- ✅ Detects `ACT=true` environment variable
- ✅ Detects `workflow_dispatch` with `dry_run=true`
- ✅ Skips git commit when in dry-run mode
- ✅ Shows coverage summary in dry-run mode

To test locally:

```bash
# Set ACT environment variable
export ACT=true

# Run workflow (will skip artifact uploads due to act limitations)
act push

# Or test specific job
ACT=true act -j upload-coverage
```

The dry-run logic will work correctly in GitHub Actions even if act has limitations.
