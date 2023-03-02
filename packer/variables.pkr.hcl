variable "aws_region" {
  type        = string
  description = "AWS Region"
  default     = "us-east-1"
}

variable "source_ami" {
  type        = string
  description = "AWS Source AMI"
  default     = "ami-0dfcb1ef8550277af"
}

variable "ec2_instance_type" {
  type        = string
  description = "AWS EC2 Instance Type"
  default     = "t2.micro"
}

variable "ssh_username" {
  type        = string
  description = "SSH Username"
  default     = "ec2-user"
}

variable "polling_delay_seconds" {
  type        = number
  description = "AWS Polling Delay Seconds"
  default     = 120
}

variable "polling_max_attempts" {
  type        = number
  description = "AWS Polling Max Attempts"
  default     = 50
}

variable "delete_on_termination" {
  type        = bool
  description = "AWS Launch Block Device Mappings Delete On Termination"
  default     = true
}

variable "device_name" {
  type        = string
  description = "AWS Launch Block Device Mappings Device Name"
  default     = "/dev/xvda"
}

variable "volume_size" {
  type        = number
  description = "AWS Launch Block Device Mappings Volume Size"
  default     = 10
}

variable "volume_type" {
  type        = string
  description = "AWS Launch Block Device Mappings Volume Type"
  default     = "gp2"
}

variable "subnet_id" {
  type        = string
  description = "AWS VPC Subnet ID"
  default     = "subnet-0fa760385ece845c7"
}

variable "ami_regions" {
  type        = list(string)
  description = "AWS AMI Region"
  default     = ["us-east-1", "us-west-2"]
}

variable "ami_users" {
  type        = list(string)
  description = "AWS AMI USERS"
  default     = []
}

variable "provisioner_file_source" {
  type        = string
  description = "Provisioner File Source"
  default     = "./webapp.tar.gz"
}

variable "provisioner_file_destination" {
  type        = string
  description = "Provisioner File Destination"
  default     = "/home/ec2-user/webapp.tar.gz"
}

variable "provisioner_shell_script_path" {
  type        = string
  description = "Provisioner Shell Script Path"
  default     = "./scripts/setup-node-env.sh"
}

variable "provisioner_shell_pause_before" {
  type        = string
  description = "Provisioner Shell Pause Before"
  default     = "10s"
}

variable "provisioner_shell_timeout" {
  type        = string
  description = "Provisioner Shell Timeout"
  default     = "10s"
}