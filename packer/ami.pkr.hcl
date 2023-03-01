source "amazon-ebs" "aws-ami" {
  region          = var.aws_region
  source_ami      = var.source_ami
  instance_type   = var.ec2_instance_type
  ssh_username    = var.ssh_username
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  subnet_id       = var.subnet_id
  ami_regions     = var.ami_regions
  ami_users       = var.ami_users
  aws_polling {
    delay_seconds = var.polling_delay_seconds
    max_attempts  = var.polling_max_attempts
  }

  launch_block_device_mappings {
    delete_on_termination = var.delete_on_termination
    device_name           = var.device_name
    volume_size           = var.volume_size
    volume_type           = var.volume_type
  }
}

build {
  name = "webapp-packer"
  sources = [
    "amazon-ebs.aws-ami
  ]

  provisioner "file" {
    source      = var.provisioner_file_source
    destination = var.provisioner_file_destination
  }

  provisioner "shell" {
    script       = var.provisioner_shell_script_path
    pause_before = var.provisioner_shell_pause_before
    timeout      = var.provisioner_shell_timeout
  }
}
